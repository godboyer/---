

export function useGetYaerWeek() {
    let day1 = new Date();
        let year = day1.getFullYear();
        let day2 = new Date(year, 0, 1);
        let day = Math.round((day1.getTime() - day2.getTime()) / 86400000);
        var week = Math.ceil((day + ((day2.getDay()+1) - 1)) /7)
        return [week]
}