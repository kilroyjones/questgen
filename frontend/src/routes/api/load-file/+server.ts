import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	// let fileData = await request.json();
	// let encoder = new TextEncoder();
	// let binaryFileData = encoder.encode(fileData);
	// let res = fs.readFile(binaryFileData, (err: Error, pdfBuffer: any) => {
	// 	console.log('here', err, pdfBuffer);
	// 	if (!err) {
	// 		let res = pdfParser.parseBuffer(pdfBuffer);
	// 		console.log(res);
	// 	}
	// });
	// console.log(res);
	// // let buffer = Buffer.from(fileData, 'utf-8');

	// fs.readFile(pdfFilePath, (err, pdfBuffer) => {
	// 	if (!err) {
	// 		pdfParser.parseBuffer(pdfBuffer);
	// 	}
	// });
	// if ('username' in result) {
	// 	return new Response(JSON.stringify({ status: 'success' }));
	// }
	return new Response(JSON.stringify({ status: 'error' }));
};
