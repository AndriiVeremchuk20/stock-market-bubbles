import { NextResponse, NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
	
	if(req.nextUrl.pathname.startsWith("/stock/screener")){
		console.log("It's work!!!");
	}

	NextResponse.next();
}
 
//export const config = {
//  matcher: '/stock/screener',
//}
