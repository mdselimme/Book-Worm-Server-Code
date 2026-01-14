import { Book } from "../book/book.model";
import { User } from "../user/user.model";
import { IReading, ReadingProgress } from "./reading.interface";
import { Reading } from "./reading.model";


//Want to read book service
const wantToReadBookService = async (readingData: IReading) => {
    //check book existence
    const book = await Book.findById(readingData.book);
    if (!book) {
        throw new Error('Book not found');
    }
    // Check user existence
    const user = await User.findById(readingData.user);
    if (!user) {
        throw new Error('User not found');
    }
    //check book already in want to read list
    const alreadyExists = await Reading.findOne({
        user: readingData.user,
        book: readingData.book,
        progress: ReadingProgress.WANT_TO_READ,
    });
    if (alreadyExists) {
        throw new Error('Book already in Want to Read list');
    }
    // Add book to Want to Read list
    const reading = new Reading({
        user: readingData.user,
        book: readingData.book,
    });
    await reading.save();
    return reading;
};

//UPDATE READING PROGRESS SERVICE
const updateReadingProgressService = async (id: string, progress: ReadingProgress) => {
    // Find the reading entry by ID
    const reading = await Reading.findById(id);
    if (!reading) {
        throw new Error('Reading entry not found');
    }
    // Update the reading progress
    reading.progress = progress;
    await reading.save();
    return reading;
};

export const readingService = {
    wantToReadBookService,
    updateReadingProgressService,
};
