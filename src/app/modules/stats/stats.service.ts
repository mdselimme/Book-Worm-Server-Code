import { User } from "../user/user.model";
import { Book } from "../book/book.model";
import { Reading } from "../reading/reading.model";
import { Review } from "../review/review.model";
import { Category } from "../categories/categories.model";
import { ReadingProgress } from "../reading/reading.interface";
import { ReviewStatus } from "../review/review.interface";
import { UserRole } from "../user/user.interface";
import { Types } from "mongoose";

// Admin Stats Service
const getAdminStats = async () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Get first day of current month
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);

    // Total counts
    const totalUsers = await User.countDocuments({ role: UserRole.USER });
    const totalAdmins = await User.countDocuments({ role: UserRole.ADMIN });
    const totalBooks = await Book.countDocuments();
    const totalCategories = await Category.countDocuments();
    const totalReviews = await Review.countDocuments();
    const totalReadingActivities = await Reading.countDocuments();

    // This month's new additions
    const newUsersThisMonth = await User.countDocuments({
        role: UserRole.USER,
        createdAt: { $gte: firstDayOfMonth }
    });

    const newBooksThisMonth = await Book.countDocuments({
        createdAt: { $gte: firstDayOfMonth }
    });

    // Mongoose stores timestamps as Date objects in MongoDB
    const newReviewsThisMonth = await Review.countDocuments(
        { createdAt: { $gte: firstDayOfMonth } } as never
    );

    // Reading progress breakdown
    const readingProgressStats = await Reading.aggregate([
        {
            $group: {
                _id: "$progress",
                count: { $sum: 1 }
            }
        }
    ]);

    const readingStats = {
        wantToRead: 0,
        currentlyReading: 0,
        completed: 0
    };

    readingProgressStats.forEach(stat => {
        if (stat._id === ReadingProgress.WANT_TO_READ) {
            readingStats.wantToRead = stat.count;
        } else if (stat._id === ReadingProgress.CURRENTLY_READING) {
            readingStats.currentlyReading = stat.count;
        } else if (stat._id === ReadingProgress.READ) {
            readingStats.completed = stat.count;
        }
    });

    // Review status breakdown
    const reviewStatusStats = await Review.aggregate([
        {
            $group: {
                _id: "$status",
                count: { $sum: 1 }
            }
        }
    ]);

    const reviewStats = {
        pending: 0,
        approved: 0,
        declined: 0
    };

    reviewStatusStats.forEach(stat => {
        if (stat._id === ReviewStatus.PENDING) {
            reviewStats.pending = stat.count;
        } else if (stat._id === ReviewStatus.APPROVE) {
            reviewStats.approved = stat.count;
        } else if (stat._id === ReviewStatus.DECLINED) {
            reviewStats.declined = stat.count;
        }
    });

    // Most popular books (by reading count)
    const popularBooks = await Reading.aggregate([
        {
            $group: {
                _id: "$book",
                readCount: { $sum: 1 }
            }
        },
        { $sort: { readCount: -1 } },
        { $limit: 5 },
        {
            $lookup: {
                from: "books",
                localField: "_id",
                foreignField: "_id",
                as: "bookDetails"
            }
        },
        { $unwind: "$bookDetails" },
        {
            $project: {
                _id: 1,
                title: "$bookDetails.title",
                author: "$bookDetails.author",
                coverImage: "$bookDetails.coverImage",
                readCount: 1
            }
        }
    ]);

    // Top rated books
    const topRatedBooks = await Review.aggregate([
        { $match: { status: ReviewStatus.APPROVE } },
        {
            $group: {
                _id: "$book",
                averageRating: { $avg: "$rating" },
                reviewCount: { $sum: 1 }
            }
        },
        { $match: { reviewCount: { $gte: 1 } } },
        { $sort: { averageRating: -1, reviewCount: -1 } },
        { $limit: 5 },
        {
            $lookup: {
                from: "books",
                localField: "_id",
                foreignField: "_id",
                as: "bookDetails"
            }
        },
        { $unwind: "$bookDetails" },
        {
            $project: {
                _id: 1,
                title: "$bookDetails.title",
                author: "$bookDetails.author",
                coverImage: "$bookDetails.coverImage",
                averageRating: { $round: ["$averageRating", 1] },
                reviewCount: 1
            }
        }
    ]);

    // Most active users (by reading and review activities)
    const activeUsers = await User.aggregate([
        { $match: { role: UserRole.USER } },
        {
            $lookup: {
                from: "readings",
                localField: "_id",
                foreignField: "user",
                as: "readings"
            }
        },
        {
            $lookup: {
                from: "reviews",
                localField: "_id",
                foreignField: "reviewer",
                as: "reviews"
            }
        },
        {
            $project: {
                name: 1,
                email: 1,
                profilePhoto: 1,
                activityCount: {
                    $add: [
                        { $size: "$readings" },
                        { $size: "$reviews" }
                    ]
                }
            }
        },
        { $sort: { activityCount: -1 } },
        { $limit: 5 }
    ]);

    // Most popular categories
    const popularCategories = await Book.aggregate([
        { $unwind: "$categories" },
        {
            $group: {
                _id: "$categories",
                bookCount: { $sum: 1 }
            }
        },
        { $sort: { bookCount: -1 } },
        { $limit: 5 },
        {
            $lookup: {
                from: "categories",
                localField: "_id",
                foreignField: "_id",
                as: "categoryDetails"
            }
        },
        { $unwind: "$categoryDetails" },
        {
            $project: {
                _id: 1,
                title: "$categoryDetails.title",
                bookCount: 1
            }
        }
    ]);

    return {
        overview: {
            totalUsers,
            totalAdmins,
            totalBooks,
            totalCategories,
            totalReviews,
            totalReadingActivities
        },
        thisMonth: {
            newUsers: newUsersThisMonth,
            newBooks: newBooksThisMonth,
            newReviews: newReviewsThisMonth
        },
        readingStats,
        reviewStats,
        popularBooks,
        topRatedBooks,
        activeUsers,
        popularCategories
    };
};

// User Stats Service
const getUserStats = async (userId: string) => {
    const userObjectId = new Types.ObjectId(userId);

    // User's reading statistics
    const userReadings = await Reading.find({ user: userObjectId });

    const readingStats = {
        wantToRead: userReadings.filter(r => r.progress === ReadingProgress.WANT_TO_READ).length,
        currentlyReading: userReadings.filter(r => r.progress === ReadingProgress.CURRENTLY_READING).length,
        completed: userReadings.filter(r => r.progress === ReadingProgress.READ).length,
        total: userReadings.length
    };

    // User's review statistics
    const totalReviews = await Review.countDocuments({ reviewer: userObjectId });
    const approvedReviews = await Review.countDocuments({
        reviewer: userObjectId,
        status: ReviewStatus.APPROVE
    });
    const pendingReviews = await Review.countDocuments({
        reviewer: userObjectId,
        status: ReviewStatus.PENDING
    });

    // User's average rating given
    const averageRatingResult = await Review.aggregate([
        { $match: { reviewer: userObjectId } },
        {
            $group: {
                _id: null,
                averageRating: { $avg: "$rating" }
            }
        }
    ]);

    const averageRating = averageRatingResult.length > 0
        ? Math.round(averageRatingResult[0].averageRating * 10) / 10
        : 0;

    // Recently completed books
    const recentlyCompleted = await Reading.find({
        user: userObjectId,
        progress: ReadingProgress.READ
    })
        .populate('book')
        .sort({ updatedAt: -1 })
        .limit(5);

    // Currently reading books
    const currentlyReading = await Reading.find({
        user: userObjectId,
        progress: ReadingProgress.CURRENTLY_READING
    })
        .populate('book')
        .sort({ updatedAt: -1 })
        .limit(5);

    // User's favorite categories (based on books they've read)
    const favoriteCategories = await Reading.aggregate([
        { $match: { user: userObjectId, progress: ReadingProgress.READ } },
        {
            $lookup: {
                from: "books",
                localField: "book",
                foreignField: "_id",
                as: "bookDetails"
            }
        },
        { $unwind: "$bookDetails" },
        { $unwind: "$bookDetails.categories" },
        {
            $group: {
                _id: "$bookDetails.categories",
                count: { $sum: 1 }
            }
        },
        { $sort: { count: -1 } },
        { $limit: 5 },
        {
            $lookup: {
                from: "categories",
                localField: "_id",
                foreignField: "_id",
                as: "categoryDetails"
            }
        },
        { $unwind: "$categoryDetails" },
        {
            $project: {
                _id: 1,
                title: "$categoryDetails.title",
                count: 1
            }
        }
    ]);

    // User's recent reviews
    const recentReviews = await Review.find({ reviewer: userObjectId })
        .populate('book')
        .sort({ createdAt: -1 })
        .limit(5);

    // Reading streak (days with reading activity in the last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentActivity = await Reading.find({
        user: userObjectId,
        updatedAt: { $gte: thirtyDaysAgo }
    }).select('updatedAt');

    const uniqueActivityDays = new Set(
        recentActivity.map(activity =>
            activity.updatedAt?.toISOString().split('T')[0]
        )
    ).size;

    return {
        readingStats,
        reviewStats: {
            total: totalReviews,
            approved: approvedReviews,
            pending: pendingReviews,
            averageRating
        },
        recentlyCompleted,
        currentlyReading,
        favoriteCategories,
        recentReviews,
        activityStats: {
            activeDaysLast30Days: uniqueActivityDays,
            totalActivities: readingStats.total + totalReviews
        }
    };
};

export const StatsService = {
    getAdminStats,
    getUserStats
};
