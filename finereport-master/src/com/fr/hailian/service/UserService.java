package com.fr.hailian.service;

import java.io.InputStream;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.usermodel.Row;
import org.json.JSONObject;

import com.fr.data.impl.NameDatabaseConnection;
import com.fr.hailian.core.Constants;
import com.fr.hailian.core.DataBaseToolService;
import com.fr.hailian.excel.ImportExcel;
import com.fr.hailian.model.UserModel;

/**
 * 
 * @className UserService.java
 * @time   2017年8月14日 上午10:32:03
 * @author zuoqb
 * @todo   用户信息维护service
 */
public class UserService {
	private static UserService instance;

	private UserService() {
	};

	public static UserService getInstance() {
		if (instance == null) {
			instance = new UserService();
		}
		return instance;
	}

	/**
	 * 
	 * @time   2017年8月15日 下午1:28:12
	 * @author zuoqb
	 * @todo   根据工号（用户名）获取用户信息
	 * @param  @param userId
	 * @param  @return
	 * @return_type   UserModel
	 */
	public UserModel getUserByUserName(Object userName) {
		UserModel user = new UserModel();
		String sql = "select id,username,password,realname,email from fr_t_user where username='" + userName
				+ "' limit 1 ";
		try {
			String[][] result = DataBaseToolService.getQueryResultBySql(sql);
			if (result.length > 0) {
				user.setId(result[0][0]);
				user.setUserName(result[0][1]);
				user.setPassword(result[0][2]);
				user.setRealName(result[0][3]);
				user.setEmail(result[0][4]);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return user;
	}

	/**
	 * 
	 * @time   2017年8月15日 下午1:28:12
	 * @author zuoqb
	 * @todo   根据ID获取用户信息
	 * @param  @param userId
	 * @param  @return
	 * @return_type   UserModel
	 */
	public UserModel getUserById(Object userId) {
		UserModel user = new UserModel();
		String sql = "select id,username,password,realname,email from fr_t_user where id='" + userId + "' limit 1 ";
		try {
			String[][] result = DataBaseToolService.getQueryResultBySql(sql);
			if (result.length > 0) {
				user.setId(result[0][0]);
				user.setUserName(result[0][1]);
				user.setPassword(result[0][2]);
				user.setRealName(result[0][3]);
				user.setEmail(result[0][4]);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return user;
	}

	/**
	 * 
	 * @time   2017年8月14日 上午10:35:21
	 * @author zuoqb
	 * @todo   根据是否存在:ID用户名都相同
	 * @param  @param userNum
	 * @param  @return
	 * @return_type   boolean
	 */
	public boolean ifExistsUser(UserModel user) {
		if (user == null) {
			return false;
		}
		String sql = "select * from fr_t_user where  id='" + user.getId() + "' ";

		try {
			return DataBaseToolService.ifExistsBySql(sql);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	/**
	 * 
	 * @time   2017年8月14日 上午10:35:21
	 * @author zuoqb
	 * @todo   是否存在部门与用户对照:ID用户名都相同
	 * @param  @param user
	 * @param  @return
	 * @return_type   boolean
	 */
	public boolean ifExistsDepUser(UserModel user) {
		if (user == null) {
			return false;
		}
		String sql = "select * from fr_t_department_post_user where userid='" + user.getId() + "'";

		try {
			return DataBaseToolService.ifExistsBySql(sql);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	/**
	 * 
	 * @time   2017年8月14日 上午10:59:21
	 * @author zuoqb
	 * @todo   插入一个员工信息
	 * @param  @param user
	 * @param  @return
	 * @return_type   boolean
	 */
	public boolean insertUser(UserModel user) {
		String insertsql = getInsertUserSql(user);
		try {
			DataBaseToolService.excuteBySql(insertsql);
			return true;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return false;
	}

	/**
	 * 
	 * @time   2017年8月16日 上午11:11:09
	 * @author zuoqb
	 * @todo   部门角色对应的用户表插入语句
	 * @param  @param user
	 * @param  @return
	 * @return_type   String
	 */
	public String getInsertDepartmentPostUserSql(UserModel user) {
		String insertsql = "insert into fr_t_department_post_user(userid, departmentid, postid) values (" + "'"
				+ user.getId() + "'," + "'" + user.getOrgCode() + "'," + "'" + Constants.DEFAULT_POST + "')";
		return insertsql;
	}

	/**
	 * 
	 * @time   2017年8月14日 下午4:45:41
	 * @author zuoqb
	 * @todo   拼接插入语句
	 * @param  @param user
	 * @param  @return
	 * @return_type   String
	 */
	public String getInsertUserSql(UserModel user) {
		String insertsql = "insert into fr_t_user(id,username, password, realname,email) values (" + "'" + user.getId()
				+ "'," + "'" + user.getUserName() + "'," + "'" + user.getPassword() + "'," + "'" + user.getUserName()
				+ "'," + "'" + user.getEmail() + "')";
		return insertsql;
	}

	public boolean updateUser(UserModel user) {
		String updatesql = getupdateUserSql(user);
		try {
			DataBaseToolService.excuteBySql(updatesql);
			return true;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return false;
	}

	public String getupdateUserSql(UserModel user) {
		String updatesql = " update  fr_t_user set  username='" + user.getUserName() + "', password='"
				+ user.getPassword() + "', realname='" + user.getRealName() + "', email='" + user.getEmail() + "' ";
		updatesql += " where id='" + user.getId() + "' ";
		return updatesql;
	}

	/**
	 * 
	 * @time   2017年8月14日 下午3:37:20
	 * @author zuoqb
	 * @todo   读取excel转成实体对象
	 * @param  @param filePath
	 * @param  @return
	 * @return_type   List<UserModel>
	 */
	public List<UserModel> getExcel2User(String filePath) {
		ImportExcel ei;
		try {
			ei = new ImportExcel(filePath, 0);
			return excel2User(ei);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public List<UserModel> getExcel2User(String fileName, InputStream is) {
		ImportExcel ei;
		try {
			ei = new ImportExcel(fileName, is, 0, 0);
			return excel2User(ei);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 	可同步的数据USERID （用户ID）	PASSWORD（密码）	NAME（名字）	
	 * ORGID（组织机构ID）	EMAIL（邮箱）	FORGNAME（组织机构名称）
	 */
	private List<UserModel> excel2User(ImportExcel ei) {
		List<UserModel> userList = new ArrayList<UserModel>();
		for (int i = ei.getDataRowNum(); i < ei.getLastDataRowNum() + 1; i++) {
			Row row = ei.getRow(i);
			if (ei.getLastCellNum() >= 5) {
				UserModel m = new UserModel();
				for (int j = 0; j < ei.getLastCellNum(); j++) {
					String val = ei.getCellValue(row, j) + "";
					switch (j) {
					case 0:
						m.setId(val);
						break;
					case 1:
						m.setPassword(Constants.DEFAULT_PWD);
						break;
					case 2:
						m.setUserName(val);
						m.setRealName(val);
						break;
					case 3:
						m.setOrgCode(val);
						break;
					case 4:
						m.setEmail(val);
						break;
					case 5:
						m.setOrgName(val);
						break;
					default:
						break;
					}
				}
				m.setPassword(Constants.DEFAULT_PWD);
				userList.add(m);
			}
		}
		return userList;
	}

	/**
	 * 
	 * @time   2017年8月14日 下午4:54:06
	 * @author zuoqb
	 * @todo   根据文件路径 导入用户信息
	 * @param  @param filePath
	 * @param  @return
	 * @return_type   JSONObject
	 */
	public JSONObject importUser(String filePath) {
		List<UserModel> userList = getExcel2User(filePath);
		return operateDbForUser(userList);
	}

	public JSONObject importUser(String fileName, InputStream is) {
		List<UserModel> userList = getExcel2User(fileName, is);
		return operateDbForUser(userList);
	}

	/**
	 * 
	 * @time   2017年8月16日 上午11:08:46
	 * @author zuoqb
	 * @todo   将用户写入数据库
	 * @param  @param userList
	 * @param  @return
	 * @return_type   JSONObject
	 */
	private JSONObject operateDbForUser(List<UserModel> userList) {
		JSONObject o = new JSONObject();
		if (userList == null || userList.size() == 0) {
			o.put("fail", true);
			o.put("msg", "Excel内容不能为空！");
		} else {
			List<String> updateUser = new ArrayList<String>();//原系统已经存在的用户
			List<String> insertUserList = new ArrayList<String>();
			List<String> insertDepUserPostList = new ArrayList<String>();
			for (UserModel u : userList) {
				if (!UserService.getInstance().ifExistsUser(u)) {
					insertUserList.add(UserService.getInstance().getInsertUserSql(u));
				} else {
					updateUser.add(UserService.getInstance().getupdateUserSql(u));
				}
				if (!UserService.getInstance().ifExistsDepUser(u)) {
					//维护机构与用户对应关系
					insertDepUserPostList.add(UserService.getInstance().getInsertDepartmentPostUserSql(u));
				}
			}
			try {
				//写入fr_t_user
				if (insertUserList.size() > 0) {
					DataBaseToolService.excuteBySqlBatch(insertUserList);
				}
				if (updateUser.size() > 0) {
					DataBaseToolService.excuteBySqlBatch(updateUser);
				}
				//写入fr_t_department_post_user 部门角色对应的用户表
				if (insertDepUserPostList.size() > 0) {
					DataBaseToolService.excuteBySqlBatch(insertDepUserPostList);
				}
				o.put("fail", false);
				String msg = "Excel人员总数量:" + userList.size() + "。导入成功数量：" + (insertUserList.size() + updateUser.size());
				if (insertUserList.size() > 0) {
					msg += ",其中新增数量为：" + insertUserList.size();
				}
				if (updateUser.size() > 0) {
					msg += "。更新数量为：" + updateUser.size();
				}
				o.put("msg", msg);
			} catch (Exception e) {
				e.printStackTrace();
				o.put("fail", true);
				o.put("msg", "导入失败，请检查Excel格式以及导入类型");
			}

		}
		return o;
	}

	public UserModel getExistsUser(String name) {
		String sql = "select id,username,password,realname,email from fr_t_user where username='" + name
				+ "' or realname='" + name + "' ";

		try {
			String[][] res = DataBaseToolService.getQueryResultBySql(sql);
			UserModel user = new UserModel();
			if (res.length > 0) {
				user.setId(res[0][0]);
				user.setUserName(res[0][1]);
				user.setPassword(res[0][2]);
				user.setRealName(res[0][3]);
				user.setEmail(res[0][4]);
				return user;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public static void main(String[] args) {
		/*UserModel user=new UserModel("num", "test", "1", "2", "3");
		if(!ifExistsUser(user.getUserName())){
			boolean insert=insertUser(user);
			System.out.println("insert:"+insert);
		}else{
			boolean update=updateUser(user);
			System.out.println("update:"+update);
		}*/
		/*JSONObject o=UserService.importUser("D:\\用户管理.xlsx");
		System.out.println(o.toString());*/
		NameDatabaseConnection con = new NameDatabaseConnection("Hsql");
		try {
			PreparedStatement ps = con.createConnection().prepareStatement("select * from fr_t_user");
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				System.out.println(rs.getString("ID"));
			}
			rs.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		//System.out.println(UserService.getExistsUser("Tom"));
	}

}
