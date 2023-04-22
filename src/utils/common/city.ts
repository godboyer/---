function findAreaByValue(value: string, data: any[]) {
  for (let province of data) {
    for (let city of province.children) {
      for (let area of city.children) {
        if (area.value === value) {
          return {
            provinceCode: province.value,
            province: province.label,
            cityCode: city.value,
            city: city.label,
            areaCode: area.value,
            area: area.label,
          };
        }
      }
    }
  }
  return null;
}


export { findAreaByValue}