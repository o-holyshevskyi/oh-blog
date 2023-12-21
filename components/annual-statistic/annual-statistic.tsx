'use client';

import { title } from "@/components/primitives";
import { Icon } from "@iconify/react";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { CircularProgress, Tab, Tabs, Tooltip } from "@nextui-org/react";
import { useTranslations } from "next-intl";

interface AnnualStatisticTranslations {
    title: string;
    annualStatistic: {
        year: number;
        statistics: {
            name: string;
            value: number;
            total: number;
            tooltip: string;
        }[];
    }[]
}

const getAnnualStatisticTranslations = (t: any): AnnualStatisticTranslations => {
    return {
        title: t("title"),
        annualStatistic: [
            {
                year: 2023,
                statistics: [
                    {
                        name: t("bugReports.title"),
                        value: 44,
                        total: 255,
                        tooltip: t("bugReports.tooltip"),
                    },
                    {
                        name: t("tasks.title"),
                        value: 122,
                        total: 858,
                        tooltip: t("tasks.tooltip"),
                    },
                    {
                        name: t("commits.title"),
                        value: 981,
                        total: 2789,
                        tooltip: t("commits.tooltip"),
                    },
                    {
                        name: t("tests.title"),
                        value: 234,
                        total: 798,
                        tooltip: t("tests.tooltip"),
                    }
                ]
            },
            {
                year: 2022,
                statistics: [
                    {
                        name: t("bugReports.title"),
                        value: 55,
                        total: 255,
                        tooltip: t("bugReports.tooltip")
                    },
                    {
                        name: t("tasks.title"),
                        value: 147,
                        total: 858,
                        tooltip: t("tasks.tooltip")
                    },
                    {
                        name: t("commits.title"),
                        value: 836,
                        total: 2789,
                        tooltip: t("commits.tooltip"),
                    },
                    {
                        name: t("tests.title"),
                        value: 201,
                        total: 798,
                        tooltip: t("tests.tooltip"),
                    }
                ]
            },
            {
                year: 2021,
                statistics: [
                    {
                        name: t("bugReports.title"),
                        value: 40,
                        total: 255,
                        tooltip: t("bugReports.tooltip")
                    },
                    {
                        name: t("tasks.title"),
                        value: 182,
                        total: 858,
                        tooltip: t("tasks.tooltip"),
                    },
                    {
                        name: t("commits.title"),
                        value: 495,
                        total: 2789,
                        tooltip: t("commits.tooltip"),
                    },
                    {
                        name: t("tests.title"),
                        value: 165,
                        total: 798,
                        tooltip: t("tests.tooltip"),
                    }
                ]
            },
            {
                year: 2020,
                statistics: [
                    {
                        name: t("bugReports.title"),
                        value: 48,
                        total: 255,
                        tooltip: t("bugReports.tooltip"),
                    },
                    {
                        name: t("tasks.title"),
                        value: 273,
                        total: 858,
                        tooltip: t("tasks.tooltip"),
                    },
                    {
                        name: t("commits.title"),
                        value: 477,
                        total: 2789,
                        tooltip: t("commits.tooltip"),
                    },
                    {
                        name: t("tests.title"),
                        value: 198,
                        total: 798,
                        tooltip: t("tests.tooltip"),
                    }
                ]
            },
            {
                year: 2019,
                statistics: [
                    {
                        name: t("bugReports.title"),
                        value: 36,
                        total: 255,
                        tooltip: t("bugReports.tooltip"),
                    },
                    {
                        name: t("tasks.title"),
                        value: 134,
                        total: 858,
                        tooltip: t("tasks.tooltip"),
                    },
                ]
            }
        ]
    }
}

export default function AnnualStatistic() {
    const t = useTranslations("statistic");
    const annualStatisticTranslations = getAnnualStatisticTranslations(t);

    const annualStatistic = () => {
        return (
            <div className="flex justify-between gap-4">
                <Tabs 
                    aria-label="options" 
                    size="lg" 
                    radius="lg" 
                    classNames={{ 
                        tabList: ['flex-col'],
                        base: ['right-[calc(30%-10px)]', 'absolute', 'mt-10']
                    }}
                >
                    {annualStatisticTranslations.annualStatistic.map((annualStatisticTranslation) => {
                        return (
                            <Tab 
                                key={annualStatisticTranslation.year.toString()} 
                                title={annualStatisticTranslation.year.toString()}
                            >
                                <div className="grid grid-cols-2 gap-10 mt-5">
                                    {annualStatisticTranslation.statistics.map((statistic, index) => {
                                        return (
                                            <Card key={index} className="w-[240px] h-[240px] border-none bg-gradient-to-br from-violet-900 to-blue-500">
                                                <CardBody className="justify-center items-center pb-0">
                                                    <CircularProgress
                                                        classNames={{
                                                            svg: "w-36 h-36 drop-shadow-md",
                                                            indicator: "stroke-white",
                                                            track: "stroke-white/10",
                                                            value: "text-3xl font-semibold text-white",
                                                        }}
                                                        value={statistic.value}
                                                        strokeWidth={4}
                                                        showValueLabel={true}
                                                        formatOptions={{}}
                                                        maxValue={statistic.total}
                                                    />
                                                </CardBody>
                                                <CardFooter className="justify-center items-center pt-0">
                                                    <Chip
                                                            classNames={{
                                                                base: "border-1 border-white/30",
                                                                content: "text-white/90 text-small font-semibold",
                                                            }}
                                                            variant="bordered"
                                                            endContent={
                                                                <Tooltip showArrow={true} content={statistic.tooltip}>
                                                                    <Icon icon="mdi:information-outline" className="cursor-pointer text-white" fontSize={18}/>
                                                                </Tooltip>
                                                            }
                                                        >
                                                            {statistic.name}
                                                        </Chip>
                                                </CardFooter>
                                            </Card>
                                        )
                                    })}
                                </div>
                            </Tab>
                        )
                    })}
                </Tabs>
            </div>
        )
    }
    
    return (
        <div>
            <div className="text-center mt-5">
                <p className={title({size: 'sm' })}>{annualStatisticTranslations.title}</p>
            </div>
            <div className="mt-5">
                {annualStatistic()}
            </div>
        </div>
    );
}