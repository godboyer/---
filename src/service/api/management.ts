import { adapter } from "@/utils";
import { request } from "../request";
import {
  adapterOfFetchUserList,
  createAdapter,
  cityAdapter,
  CommentAdapter,
  NoticeAdapter,
  LeavewordAdapter,
  TableAdapter,
  FeedbackAdapter
} from "./management.adapter";
import { DataTableRowKey } from "naive-ui";

/** 获取用户列表 */
export const fetchUserList = async () => {
  const data = await request.post<ApiUserManagement.User[] | null>(
    "/user/all-list"
  );
  return adapter(adapterOfFetchUserList, data);
};

type UserFormModel = Pick<
  UserManagement.User,
  | "username"
  | "age"
  | "gender"
  | "phone"
  | "email"
  | "user_status"
  | "role_permission"
>;

/** 添加用户*/
export const fetchUserAdd = async (data: UserFormModel) => {
  const result = await request.post<ApiUserManagement.User[] | null>(
    `/user/add`,
    { ...data }
  );
  return result;
};
/** 修改用户信息 */
export const fetchUserUpdate = async (_id: string, data: UserFormModel) => {
  const result = await request.put<ApiUserManagement.User[] | null>(
    `/user/${_id}`,
    { ...data }
  );
  return adapter(adapterOfFetchUserList, result);
};

/** 删除用户 */
export const fetchUserDEL = async (_id: string) => {
  const data = await request.delete<ApiUserManagement.User[] | null>(
    `/user/${_id}`
  );
  return data;
};

type CityFormModel = Pick<
  CityManagement.City,
  "city_id" | "city_name" | "deleted_state"
>;
/** 获取城市列表 */
export const fetchCityList = async () => {
  const data = await request.get<ApiCityManagement.City[] | null>(
    "/city/all-list"
  );
  return adapter(cityAdapter, data);
};

/** 增加城市 */
export const fetchCityAdd = async (data: CityFormModel) => {
  const result = await request.post<ApiCityManagement.City[] | null>(
    "/city/add",
    { ...data }
  );
  return result;
};

/** 更新城市 */
export const fetchCityUpdate = async (_id: string, data: CityFormModel) => {
  const result = await request.put<ApiCityManagement.City[] | null>(
    `/city/${_id}`,
    { ...data }
  );
  return result;
};

/**删除城市*/
export const fetchCityDel = async (_id: string) => {
  const data = await request.delete<ApiCityManagement.City[] | null>(
    `/city/${_id}`
  );
  return data;
};

/**--------------------------------------------------房源评论接口---------------------------------------------------- */

type CommentFormModel = Pick<
  CommentManagement.Comment,
  | "content" | "deleted_state"|"updated_time"
>;
/** 获取评论列表 */
export const fetchCommentList = async () => {
  const data = await request.get<ApiCommentManagement.Comment[] | null>(
    "/comment/all-list"
  );
  return adapter(CommentAdapter, data);
};

/** 增加评论 */
export const fetchCommentAdd = async (data: CommentFormModel) => {
  const result = await request.post<ApiCommentManagement.Comment[] | null>(
    "/comment/add",
    { ...data }
  );
  return result;
};

/** 更新评论 */
export const fetchCommentUpdate = async (
  _id: string,
  data: CommentFormModel
) => {
  const result = await request.put<ApiCommentManagement.Comment[] | null>(
    `/comment/${_id}`,
    { ...data }
  );
  return result;
};

/**删除评论*/
export const fetchCommentDel = async (_id: string) => {
  const data = await request.delete<ApiCommentManagement.Comment[] | null>(
    `/comment/${_id}`
  );
  return data;
};

interface CommentIds{
  commentIds:DataTableRowKey[]
}

/**批量删除评论*/
export const fetchBatchCommentDel = async (data: CommentIds) => {
  const result = await request.post<ApiCommentManagement.Comment[] | null>(
    `/comment/delete`,{...data}
  
  );
  return result;
};


/**--------------------------------------------------公告接口---------------------------------------------------- */

export type NoticeFormModel = Pick<
  NoticeManagement.Notice,
 |"notice_id" | "notice_title" | "deleted_state"|"notice_content"
>;
/** 获取公告列表 */
export const fetchNoticeList = async () => {
  const data = await request.get<ApiNoticeManagement.Notice[] | null>(
    "/notice/all-list"
  );
  return adapter(NoticeAdapter, data);
};

/** 增加公告 */
export const fetchNoticeAdd = async (data: NoticeFormModel) => {
  const result = await request.post<ApiNoticeManagement.Notice[] | null>(
    "/notice/add",
    { ...data }
  );
  return result;
};

/** 更新公告 */
export const fetchNoticeUpdate = async (
  _id: string,
  data: NoticeFormModel
) => {
  const result = await request.put<ApiNoticeManagement.Notice[] | null>(
    `/notice/${_id}`,
    { ...data }
  );
  return result;
};

/**删除公告*/
export const fetchNoticeDel = async (_id: string) => {
  const data = await request.delete<ApiNoticeManagement.Notice[] | null>(
    `/notice/${_id}`
  );
  return data;
};


/**--------------------------------------------------留言接口---------------------------------------------------- */

export type LeavewordFormModel = Pick<
  LeavewordManagement.Leaveword,
 |"leaveword_id"  | "recovery_state"|"content"|"user_id"
>;
/** 获取留言列表 */
export const fetchLeavewordList = async () => {
  const data = await request.get<ApiLeavewordManagement.Leaveword[] | null>(
    "/leaveword/all-list"
  );
  return adapter(LeavewordAdapter, data);
};

/** 增加留言 */
export const fetchLeavewordAdd = async (data: LeavewordFormModel) => {
  const result = await request.post<ApiLeavewordManagement.Leaveword[] | null>(
    "/leaveword/add",
    { ...data }
  );
  return result;
};

/** 更新留言 */
export const fetchLeavewordUpdate = async (
  _id: string,
  data: LeavewordFormModel
) => {
  const result = await request.put<ApiLeavewordManagement.Leaveword[] | null>(
    `/leaveword/${_id}`,
    { ...data }
  );
  return result;
};

/**删除留言*/
export const fetchLeavewordDel = async (_id: string) => {
  const data = await request.delete<ApiLeavewordManagement.Leaveword[] | null>(
    `/leaveword/${_id}`
  );
  return data;
};


/** ----获取后台表格数据的接口------ */
interface TableQeury { 
  page: number;
  pageSize: number | string;

}


export const fetchTableList = async (tableName:string,qeury:TableQeury) => { 
  const data = await request.get<ApiTableManagement.Table[] | null>(
    `/admin/${tableName}`,{params:qeury}
  );
  return adapter(TableAdapter, data as any);
}



/**--------------------------------------------------反馈接口---------------------------------------------------- */

export type FeedbackFormModel = Pick<
  FeedbackManagement.FeedbackInfo,
 |"title"  | "status"|"content"|"user_id"|"createAt"|"email"|'phone'
>;
/** 获取反馈列表 */
export const fetchFeedbackList = async () => {
  const data = await request.get<ApiFeedbackManagement.Feedback[] | null>(
    "/feedback"
  );
  return adapter(FeedbackAdapter, data);
};

/** 增加反馈 */
export const fetchFeedbackAdd = async (data: FeedbackFormModel) => {
  const result = await request.post<ApiFeedbackManagement.Feedback[] | null>(
    "/feedback/add",
    { ...data }
  );
  return result;
};

/** 更新反馈 */
export const fetchFeedbackUpdate = async (
  _id: string,
  data: FeedbackFormModel
) => {
  const result = await request.put<ApiFeedbackManagement.Feedback[] | null>(
    `/feedback/${_id}`,
    { ...data }
  );
  return result;
};

/**删除反馈*/
export const fetchFeedbackDel = async (_id: string) => {
  const data = await request.delete<ApiFeedbackManagement.Feedback[] | null>(
    `/feedback/${_id}`
  );
  return data;
};