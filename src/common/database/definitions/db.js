import { COLLECTIONS } from './models';

export type Collection = {
	insert(data: any): any,
	insertOne(data: any): any,
	updateOne(filter: any, data: any): any,
	deleteOne(filter: any): any,
	count(query?: any): number,
	find(query?: any): Collection,
	findOne(query?: any): any,
	skip(n: number): Collection,
	limit(n: number): Collection,
	toArray(): Array<any>,
};

export type IDb = {
	collection(COLLECTIONS): Collection,
};
