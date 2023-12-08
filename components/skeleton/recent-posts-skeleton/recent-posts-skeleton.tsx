import { Skeleton } from '@nextui-org/skeleton';
import { Card, CardHeader, CardFooter } from '@nextui-org/card';
import { button as buttonStyles } from "@nextui-org/theme";

export default function RecentPostSkeleton() {
    return (
        <div className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-8 mt-8">
            <Card isFooterBlurred className="w-[270px] col-span-12 sm:col-span-4 h-[300px]">
                <Skeleton className="rounded-lg">
                    <div className="h-24 rounded-lg bg-default-300"></div>
                </Skeleton>
                <CardHeader className="absolute z-10 flex-col !items-start backdrop-blur-sm">
                    <Skeleton className="w-3/4 h-6 rounded-lg">
                        <div className="h-6 w-3/4 rounded-lg bg-default-200"></div>
                    </Skeleton>
                </CardHeader>
                <Skeleton className="w-full h-[200px] rounded-lg">
                    <div className="h-[200px] rounded-lg bg-default-200"></div>
                </Skeleton>
                <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                    <div>
                        <Skeleton className="w-2/3 h-4 rounded-lg">
                            <div className="h-4 w-2/3 rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-1/2 h-4 rounded-lg">
                            <div className="h-4 w-1/2 rounded-lg bg-default-200"></div>
                        </Skeleton>
                    </div>
                    <Skeleton className="w-1/3 h-8 rounded-lg">
                        <div className={buttonStyles({ radius: "full", color: "primary", size: 'sm' })}></div>
                    </Skeleton>
                </CardFooter>
            </Card>
            <Card isFooterBlurred className="w-[270px] col-span-12 sm:col-span-4 h-[300px]">
                <Skeleton className="rounded-lg">
                    <div className="h-24 rounded-lg bg-default-300"></div>
                </Skeleton>
                <CardHeader className="absolute z-10 flex-col !items-start backdrop-blur-sm">
                    <Skeleton className="w-3/4 h-6 rounded-lg">
                        <div className="h-6 w-3/4 rounded-lg bg-default-200"></div>
                    </Skeleton>
                </CardHeader>
                <Skeleton className="w-full h-[200px] rounded-lg">
                    <div className="h-[200px] rounded-lg bg-default-200"></div>
                </Skeleton>
                <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                    <div>
                        <Skeleton className="w-2/3 h-4 rounded-lg">
                            <div className="h-4 w-2/3 rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-1/2 h-4 rounded-lg">
                            <div className="h-4 w-1/2 rounded-lg bg-default-200"></div>
                        </Skeleton>
                    </div>
                    <Skeleton className="w-1/3 h-8 rounded-lg">
                        <div className={buttonStyles({ radius: "full", color: "primary", size: 'sm' })}></div>
                    </Skeleton>
                </CardFooter>
            </Card>
            <Card isFooterBlurred className="w-[270px] col-span-12 sm:col-span-4 h-[300px]">
                <Skeleton className="rounded-lg">
                    <div className="h-24 rounded-lg bg-default-300"></div>
                </Skeleton>
                <CardHeader className="absolute z-10 flex-col !items-start backdrop-blur-sm">
                    <Skeleton className="w-3/4 h-6 rounded-lg">
                        <div className="h-6 w-3/4 rounded-lg bg-default-200"></div>
                    </Skeleton>
                </CardHeader>
                <Skeleton className="w-full h-[200px] rounded-lg">
                    <div className="h-[200px] rounded-lg bg-default-200"></div>
                </Skeleton>
                <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                    <div>
                        <Skeleton className="w-2/3 h-4 rounded-lg">
                            <div className="h-4 w-2/3 rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-1/2 h-4 rounded-lg">
                            <div className="h-4 w-1/2 rounded-lg bg-default-200"></div>
                        </Skeleton>
                    </div>
                    <Skeleton className="w-1/3 h-8 rounded-lg">
                        <div className={buttonStyles({ radius: "full", color: "primary", size: 'sm' })}></div>
                    </Skeleton>
                </CardFooter>
            </Card>
            <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-5">
                <Skeleton className="rounded-lg">
                    <div className="h-24 rounded-lg bg-default-300"></div>
                </Skeleton>
                <CardHeader className="absolute z-10 flex-col !items-start backdrop-blur-sm">
                    <Skeleton className="w-3/4 h-6 rounded-lg">
                        <div className="h-6 w-3/4 rounded-lg bg-default-200"></div>
                    </Skeleton>
                </CardHeader>
                <Skeleton className="w-full h-[200px] rounded-lg">
                    <div className="h-[200px] rounded-lg bg-default-200"></div>
                </Skeleton>
                <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                    <div>
                        <Skeleton className="w-2/3 h-4 rounded-lg">
                            <div className="h-4 w-2/3 rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-1/2 h-4 rounded-lg">
                            <div className="h-4 w-1/2 rounded-lg bg-default-200"></div>
                        </Skeleton>
                    </div>
                    <Skeleton className="w-1/3 h-8 rounded-lg">
                        <div className={buttonStyles({ radius: "full", color: "primary", size: 'sm' })}></div>
                    </Skeleton>
                </CardFooter>
            </Card>
            <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-7">
                <Skeleton className="rounded-lg">
                    <div className="h-24 rounded-lg bg-default-300"></div>
                </Skeleton>
                <CardHeader className="absolute z-10 flex-col !items-start backdrop-blur-sm">
                    <Skeleton className="w-3/4 h-6 rounded-lg">
                        <div className="h-6 w-3/4 rounded-lg bg-default-200"></div>
                    </Skeleton>
                </CardHeader>
                <Skeleton className="w-full h-[200px] rounded-lg">
                    <div className="h-[200px] rounded-lg bg-default-200"></div>
                </Skeleton>
                <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                    <div>
                        <Skeleton className="w-2/3 h-4 rounded-lg">
                            <div className="h-4 w-2/3 rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-1/2 h-4 rounded-lg">
                            <div className="h-4 w-1/2 rounded-lg bg-default-200"></div>
                        </Skeleton>
                    </div>
                    <Skeleton className="w-1/3 h-8 rounded-lg">
                        <div className={buttonStyles({ radius: "full", color: "primary", size: 'sm' })}></div>
                    </Skeleton>
                </CardFooter>
            </Card>
        </div>
    )
}