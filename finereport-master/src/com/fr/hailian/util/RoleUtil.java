package com.fr.hailian.util;

import java.util.Iterator;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fr.fs.base.entity.CustomRole;
import com.fr.fs.base.entity.User;
import com.fr.fs.control.UserControl;
import com.fr.fs.web.service.ServiceUtils;
import com.fr.hailian.action.HlLoadLoginAction;

/**
 * 
 * @className RoleUtil.java
 * @time   2017年8月8日 下午6:08:38
 * @author zuoqb
 * @todo   角色工具栏
 */
public class RoleUtil {
	/**
	 * 
	 * @time   2017年8月8日 下午6:10:36
	 * @author zuoqb
	 * @todo   判断是否包含辅助系统权限
	 * @param  @param user
	 * @param  @return
	 * @return_type   boolean
	 */
	public static boolean judgeAuxiliaryRole(User user){
		Set<CustomRole> roles;
		boolean hasRole=false;
		try {
			roles = UserControl.getInstance().getSRoles(user.getId());
			//根据用户id获取该所属的所有角色
			Iterator<CustomRole> it = roles.iterator();  
			while (it.hasNext()) {  
				CustomRole role = it.next();
				System.out.println("role id:"+role.getId()+" roleName:"+role.getRolename()+" roleDisplayName:"+role.getDisplayName());
				if(role.getDisplayName().equals(com.fr.hailian.core.Constants.AUXILIARYROLE_NAME)){
					hasRole=true;
					break;
				}
//				if(role.getId()==com.fr.hailian.util.Constants.AUXILIARYROLE_ID){
//					hasRole=true;
//					break;
//				}
			};
		} catch (Exception e) {
			e.printStackTrace();
		}
		return hasRole;
	}
	public static void loginCMD(HttpServletRequest request,
			HttpServletResponse response){
		HlLoadLoginAction hl=new HlLoadLoginAction();
		try {
			hl.actionCMD(request, response);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	/**
	 * 
	 * @time   2017年8月10日 上午11:33:24
	 * @author zuoqb
	 * @todo   判断是否是管理员
	 * @param  @param user
	 * @param  @return
	 * @return_type   boolean
	 */
	public static boolean isSuperAdmin(User user){
		long superManagerID=UserControl.getInstance().getSuperManagerID();//超级管理员ID
		boolean isAdmin = superManagerID == user.getId(); //判断是否是管理员
		return isAdmin;
	}
	/**
	 * 
	 * @time   2017年8月11日 上午10:41:14
	 * @author zuoqb
	 * @todo  过去当前登录用户
	 * @param  @param request
	 * @param  @return
	 * @return_type   User
	 */
	public static User getCurrentUser(HttpServletRequest request){
		long userID = ServiceUtils.getCurrentUserID(request);
		User user=null;
		try {
			user = UserControl.getInstance().getUser(userID);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}//获取用户对象
		return user;
	}
}
