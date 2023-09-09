'use client'
import {HeatmapDatum} from "@/types/publicUser";
import {ConvertSecondsToTime} from "@/Helpers/SecondsConverter";
import ReactTooltip from "react-tooltip";
import s from "@/app/p/[name]/page.module.css";
import CalendarHeatmap from "@/libs/react-calendar-heatmap/dist/react-calendar-heatmap.esm";

export function Calendar({data}:{data:HeatmapDatum[] | undefined}) {

    let mappedArray: any[] = [];
    if(data !== undefined)
        mappedArray = data.map(function (obj) {
            return {
                count: obj.playtime == null ? 0 : obj.playtime,
                date: obj.date,
                level: 1
            };
        });

    const getTooltipDataAttrs = (value:any) => {
        // Temporary hack around null value.date issue
        if (!value || !value.date) {
            return null;
        }
        // Configuration for react-tooltip
        return {
            'data-tip': `${value.date} награв: ${ConvertSecondsToTime(value.count)}`,
        };
    };



    return (
        <>
            <ReactTooltip  className={s.tooltip} />
            <CalendarHeatmap
                startDate={new Date('2023-07-19')}
                endDate={new Date('2023-12-31')}
                showMonthLabels = {false}
                showWeekdayLabels = {false}

                tooltipDataAttrs={getTooltipDataAttrs}

                weekdayLabels={['нд', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']}
                monthLabels={['січ', 'лют', 'бер', 'кві', 'тра', 'чер', 'лип', 'сер', 'вер', 'жов', 'лис', 'гру']}
                values={mappedArray}
                classForValue={(value: { count: number; }) => {
                    if (!value) {
                        return s.colorScale0;
                    }

                    if(value.count == 0)
                        return s.colorScale0;
                    else if(value.count <= 3600)
                        return s.colorScale1;
                    else if(value.count <= 3600*2)
                        return s.colorScale2;
                    else if(value.count <= 3600*3)
                        return s.colorScale3;
                    else if(value.count <= 3600*4)
                        return s.colorScale4;
                    else if(value.count > 3600*4)
                        return s.colorScale5;

                }} />
        </>
    )
}