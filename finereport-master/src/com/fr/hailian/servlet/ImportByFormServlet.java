package com.fr.hailian.servlet;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Iterator;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.json.JSONObject;

import com.fr.hailian.core.BaseServlet;
import com.fr.hailian.service.OrganizationService;
import com.fr.hailian.service.UserService;

/**
 * 
 * @className ImportUserServlet.java
 * @time   2017年8月14日 下午8:31:14
 * @author zuoqb
 * @todo   通过form导入人员信息
 */
public class ImportByFormServlet extends BaseServlet {
	/**
	 * 
	 */
	private static final long serialVersionUID = -8091436245999618392L;

	/**
	 * Constructor of the object.
	 */
	public ImportByFormServlet() {
		super();
	}

	/**
	 * Destruction of the servlet. <br>
	 */
	public void destroy() {
		super.destroy(); // Just puts "destroy" string in log
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		overwriteImportByForm(request, response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		overwriteImportByForm(request, response);
	}

	@SuppressWarnings("unchecked")
	private void overwriteImportByForm(HttpServletRequest request, HttpServletResponse response) {
		JSONObject r = new JSONObject();
		try {
			DiskFileItemFactory factory = new DiskFileItemFactory();
			ServletFileUpload upload = new ServletFileUpload(factory);
			List<FileItem> items = upload.parseRequest(request);// 得到所有的文件  
			String type = null;
			FileItem excelFile = null;
			Iterator<FileItem> i = items.iterator();
			while (i.hasNext()) {
				FileItem fileItem = (FileItem) i.next();
				// 是否为表单元素。如文本框 等等。
				if (fileItem.isFormField()) {
					String name = fileItem.getFieldName();
					//通过流 用来读取表单元素里的内容。
					BufferedReader br = new BufferedReader(new InputStreamReader(fileItem.getInputStream()));
					//如果还有除文件域以外的其他表单元素 就用 if()进行名字一一匹配。此处就是request.getParameter的替换方法
					if ("type".equals(name)) {
						type = br.readLine();
					}
				} else {
					// 文件域
					excelFile = fileItem;
				}
			}
			if (excelFile != null) {
				if ("0".equals(type)) {
					r = UserService.getInstance().importUser(excelFile.getName(), excelFile.getInputStream());
				} else {
					//导入组织
					r = OrganizationService.getInstance().importOrganization(excelFile.getName(),
							excelFile.getInputStream());
				}
			} else {
				r.put("fail", true);
				r.put("msg", "请选择导入文件");
			}
		} catch (Exception e) {
			e.printStackTrace();
			r.put("fail", true);
			r.put("msg", e.getStackTrace());
		}
		responseOutWithJson(response, r);
	}

	/**
	 * 
	 * @time   2017年8月14日 下午8:29:39
	 * @author zuoqb
	 * @todo   上传
	 * @param  @param request
	 * @param  @param response
	 * @return_type   void
	 */
	/*private void overwriteUploadInfo(HttpServletRequest request,
			HttpServletResponse response) {
		JSONObject r=new JSONObject();
		try {
			 // Create a factory for disk-based file items  
	        DiskFileItemFactory factory = new DiskFileItemFactory();  
	
	        // Set factory constraints  
	        factory.setSizeThreshold(4096); // 设置缓冲区大小，这里是4kb  
	        factory.setRepository(tempPathFile);// 设置缓冲区目录  
	
	        // Create a new file upload handler  
	        ServletFileUpload upload = new ServletFileUpload(factory);  
	
	        // Set overall request size constraint  
	        upload.setSizeMax(4194304); // 设置最大文件尺寸，这里是4MB  
	
	        List<FileItem> items = upload.parseRequest(request);// 得到所有的文件  
	        Iterator<FileItem> i = items.iterator();  
	        while (i.hasNext()) {  
	            FileItem fi = (FileItem) i.next();  
	            String fileName = fi.getName();  
	            if (fileName != null) {  
	                File fullFile = new File(new String(fi.getName().getBytes(), "utf-8")); // 解决文件名乱码问题  
	                File savedFile = new File(uploadPath, fullFile.getName());  
	                fi.write(savedFile);  
	            }  
	        }  
	        System.out.print("upload succeed");  
		} catch (Exception e) {
			e.printStackTrace();
		}
		responseOutWithJson(response, r);
	}*/

	public void init() throws ServletException {
	}

}
