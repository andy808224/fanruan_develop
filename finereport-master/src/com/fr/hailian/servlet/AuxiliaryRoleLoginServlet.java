package com.fr.hailian.servlet;

import java.io.IOException;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import com.fr.fs.base.entity.User;
import com.fr.fs.control.UserControl;
import com.fr.hailian.core.BaseServlet;
import com.fr.hailian.model.UserModel;
import com.fr.hailian.service.UserService;
import com.fr.hailian.util.PortalService;
import com.fr.hailian.util.RoleUtil;
import com.fr.stable.Constants;

/**
 * 
 * @className LoginServlet.java
 * @time   2017年8月7日 下午2:17:11
 * @author zuoqb
 * @todo   辅助决策登陆改造
 */
public class AuxiliaryRoleLoginServlet extends BaseServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = -8091436245999618392L;

	/**
	 * Constructor of the object.
	 */
	public AuxiliaryRoleLoginServlet() {
		super();
	}

	/**
	 * Destruction of the servlet. <br>
	 */
	public void destroy() {
		super.destroy(); // Just puts "destroy" string in log
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		overwriteLogin(request, response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		overwriteLogin(request, response);
	}

	@SuppressWarnings("unused")
	private void overwriteLogin(HttpServletRequest request, HttpServletResponse response) {
		JSONObject r = new JSONObject();
		//System.out.println("辅助决策登陆改造开始...... ");
		HttpServletRequest hrequest = (HttpServletRequest) request;//web资源
		String name = "";
		String password = "";
		try {
			name = java.net.URLDecoder.decode(hrequest.getParameter(Constants.FR_USERNAME), "UTF-8");
			password = java.net.URLDecoder.decode(hrequest.getParameter(Constants.FR_PASSWORD), "UTF-8");
			//System.out.println("name:" + name + ",password:" + password);
			User user = UserControl.getInstance().getByUserName(name);//获取用户对象
			//System.out.println("pwd:" + user.getPassword());
			if (user != null) {
				System.out.println("user:" + user);
				//判断是否是超级管理员
				if (RoleUtil.isSuperAdmin(user)) {
					/**
					 * 是超级管理员
					 * step1:用户名 密码校验 这个在上面已经验证了
					 * step2：生成登陆凭证
					 */
					User user1 = UserControl.getInstance().getUser(name, password);//获取用户对象
					//System.out.println("user1:" + user1);
					if (user1 != null) {
						RoleUtil.loginCMD(hrequest, response);
						r.put("fail", false);
						r.put("msg", "登陆成功");
					} else {
						r.put("fail", true);
						r.put("msg", "密码错误!");
					}
				} else {
					/**
					 * 不是超级管理员
					 * step1:统一身份认证userValidate 
					 * step2:辅助决策系统权限认证
					 * step3:生成登陆凭证
					 */
					//step1:统一身份认证userValidate 
					Map<String, Object> userValid = PortalService.userValidate(name, password);
					//System.out.println("userValid:" + userValid);
					if (userValid != null && "1".equals(userValid.get("Result").toString())) {
						//step2:辅助决策系统权限认证
						if (RoleUtil.judgeAuxiliaryRole(user)) {
							//step3:生成登陆凭证
							/**
							 * 两个系统密码或许不同 所以只要统一认证成功 本地更新密码 然后本地认证
							 */
							UserModel m = UserService.getInstance().getExistsUser(name);
							m.setPassword(password);
							UserService.getInstance().updateUser(m);
							hrequest.setAttribute(Constants.FR_PASSWORD, m.getPassword());
							//System.out.println(m.getPassword());
							RoleUtil.loginCMD(hrequest, response);
							r.put("fail", false);
							r.put("msg", "登陆成功");
						} else {
							r.put("fail", true);
							r.put("msg", "该用户没有辅助决策系统权限，请联系管理员!");
						}
					} else {
						r.put("fail", true);
						r.put("msg", "统一身份认证验证失败!");
					}

				}
			} else {
				r.put("fail", true);
				r.put("msg", "用户名或者密码错误!");
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		responseOutWithJson(response, r);
	}

	public void init() throws ServletException {
	}

}
