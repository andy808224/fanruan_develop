package com.fr.hailian.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import com.fr.fs.base.entity.User;
import com.fr.fs.control.UserControl;
import com.fr.hailian.core.BaseServlet;
import com.fr.hailian.util.PortalService;
import com.fr.hailian.util.RoleUtil;
import com.fr.stable.Constants;

/**
 * 
 * @time   2017年8月10日 下午3:24:44
 * @author zuoqb
 * @todo   修改密码
 */
public class ChangePwdServlet extends BaseServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = -8091436245999618392L;

	/**
	 * Constructor of the object.
	 */
	public ChangePwdServlet() {
		super();
	}

	/**
	 * Destruction of the servlet. <br>
	 */
	public void destroy() {
		super.destroy(); // Just puts "destroy" string in log
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		overwriteChangePwd(request, response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		overwriteChangePwd(request, response);
	}

	private void overwriteChangePwd(HttpServletRequest request, HttpServletResponse response) {
		JSONObject r = new JSONObject();
		try {
			//用户名
			User user = RoleUtil.getCurrentUser(request);
			if (user != null) {
				String oldPasswd = java.net.URLDecoder.decode(request.getParameter("oldPassword"), "UTF-8");
				String newPasswd = java.net.URLDecoder.decode(request.getParameter(Constants.FR_PASSWORD), "UTF-8");
				//System.out.println("newPasswd=" + newPasswd);
				if (user.getPassword().equals(oldPasswd)) {
					if (RoleUtil.isSuperAdmin(user)) {
						//登本地修改
						boolean isSuccess = UserControl.getInstance()
								.updatePassword(user.getId(), oldPasswd, newPasswd);
						if (isSuccess) {
							//去首页
							//response.sendRedirect("/WebReport/ReportServer?op=fs");
							r.put("fail", false);
							r.put("msg", com.fr.hailian.core.Constants.CTX_PATH + "/ReportServer?op=fs");
						} else {
							r.put("fail", true);
							r.put("msg", "管理员密码修改失败，请重试！");
						}
					} else {
						//不是超级管理员 “-1”：账号不正确；“-2”：原密码错误 “0”：修改失败；“1”：修改成功
						switch (PortalService.changePassword(user.getUsername(), oldPasswd, newPasswd)) {
						case "-1":
							r.put("fail", true);
							r.put("msg", "账号不正确");
							break;
						case "-2":
							r.put("fail", true);
							r.put("msg", "原密码错误 ");
							break;
						case "0":
							r.put("fail", true);
							r.put("msg", "修改失败");
							break;
						case "1":
							r.put("fail", false);
							r.put("msg", "修改成功 ");
							//去首页
							//UserControl.getInstance().logout(user.getId());
							r.put("fail", false);
							r.put("msg", com.fr.hailian.core.Constants.CTX_PATH + "/ReportServer?op=fs");
							break;
						default:
							r.put("fail", true);
							r.put("msg", "服务器异常!");
							break;
						}
					}
					;
				} else {
					r.put("fail", true);
					r.put("msg", "原密码错误 ");
				}
			} else {
				r.put("fail", true);
				r.put("msg", "该用户不存在，请注册！");
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		responseOutWithJson(response, r);
	}

	public void init() throws ServletException {
	}

}
