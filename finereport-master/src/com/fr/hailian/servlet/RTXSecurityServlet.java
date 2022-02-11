package com.fr.hailian.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import com.fr.fs.base.entity.User;
import com.fr.fs.control.UserControl;
import com.fr.general.web.ParameterConsts;
import com.fr.hailian.core.BaseServlet;
import com.fr.hailian.util.DESSymmetricEncoder;
import com.fr.hailian.util.RoleUtil;
import com.fr.stable.Constants;
import com.fr.stable.StringUtils;
/**
 * 
 * @className RTXShareServlet.java
 * @time   2017年8月10日 下午3:24:44
 * @author zuoqb
 * @todo   RTX集成 当用户从RTX点击收到信息时  进行免登陆校验
 */
public class RTXSecurityServlet extends BaseServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = -8091436245999618392L;

	/**
	 * Constructor of the object.
	 */
	public RTXSecurityServlet() {
		super();
	}

	/**
	 * Destruction of the servlet. <br>
	 */
	public void destroy() {
		super.destroy(); // Just puts "destroy" string in log
	}
	
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		overwriteRTXSecurity(request,response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		overwriteRTXSecurity(request,response);
	}

	private void overwriteRTXSecurity(HttpServletRequest request,
			HttpServletResponse response) {
		JSONObject r=new JSONObject();
		//System.out.println(" RTX集成 当用户从RTX点击收到信息时  进行免登陆校验处理开始...... ");
		try {
			//用户名
			String userId= request.getParameter("userId");
			String sign=request.getParameter("sign");
			//System.out.println("userId="+userId+",sign="+sign);
			User user = null;
			if(StringUtils.isNotBlank(userId)){
				user=UserControl.getInstance().getUser(Long.parseLong(userId));//获取用户对象
			}
			if(user!=null){
				if(DESSymmetricEncoder.checkSign(sign, userId)){
					//登陆成功   向request写入密码 让他自登陆
					request.setAttribute(ParameterConsts.__REDIRECT__, true);
					request.setAttribute(Constants.FR_USERNAME, user.getUsername());
					request.setAttribute(Constants.FR_PASSWORD, user.getPassword());
					RoleUtil.loginCMD(request, response);
				}else{
					r.put("fail", true);
					r.put("msg", "链接超时！");
				};
			}else{
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
