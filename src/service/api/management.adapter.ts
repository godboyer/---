export function adapterOfFetchUserList(data: ApiUserManagement.User[] | null): UserManagement.User[] {
  if (!data) return [];

  return data.map((item, index) => {
    const user: UserManagement.User = {
      index: index + 1,
      key: item.user_id,
      ...item
    };

    return user;
  });
}

type AdapterFunction<T, U> = (data: T | null) => U[];

export function createAdapter<T, U>(adapterFunc: (item: T, index: number) => U): AdapterFunction<T[], U> { // 这里的返回值类型应该是 AdapterFunction<T[], U>
  return (data: T[] | null) => {
    if (!data) return [];

    return data.map(adapterFunc);
  };
}


export const cityAdapter = createAdapter<ApiCityManagement.City, CityManagement.City>((item, index) => {
  const city: CityManagement.City = {
    index: index+1,
    key: item._id,
    ...item
  };
  return city;
}); 


export const CommentAdapter = createAdapter<ApiCommentManagement.Comment, CommentManagement.Comment>((item, index) => {
  const Comment: CommentManagement.Comment = {
    index: index+1,
    key: item.comment_id,
    ...item
  };
  return Comment;
});


export const NoticeAdapter = createAdapter<ApiNoticeManagement.Notice, NoticeManagement.Notice>((item, index) => {
  const Notice: NoticeManagement.Notice = {
    index: index+1,
    key: item.notice_id,
    ...item
  };
  return Notice;
});

/**留言接口适配--LeavewordAdapter */
export const LeavewordAdapter = createAdapter<ApiLeavewordManagement.Leaveword, LeavewordManagement.Leaveword>((item, index) => {
  const Leaveword: LeavewordManagement.Leaveword = {
    index: index+1,
    key: item.leaveword_id,
    ...item
  };
  return Leaveword;
});


/**房源管理接口适配--LeavewordAdapter */
export const HouseAdapter = createAdapter<ApiHouseManagement.House, HouseManagement.House>((item, index) => {
 
  const House: HouseManagement.House = {
    index: index+1,
    key: item['_id'],
    ...item
  };
  return House;
});


/**房源管理接口适配--LeavewordAdapter */
export const HouseCardAdapter = createAdapter<HousePage.Card, HousePage.CardList>((item, index) => {
 
  const House: HousePage.CardList = {
    index: index+1,
    key: item.house_id,
    ...item
  };
  return House;
});