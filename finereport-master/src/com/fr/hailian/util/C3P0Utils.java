package com.fr.hailian.util;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.fr.data.impl.NameDatabaseConnection;
import com.fr.hailian.core.Constants;
/**
 * @className C3P0Utils.java
 * @time   2017年8月12日 上午8:53:54
 * @author zuoqb
 * @todo  数据库工具类
 */
public class C3P0Utils extends Constants{
    private static C3P0Utils dbcputils = null;
    private NameDatabaseConnection connect;


    public C3P0Utils(String dbName) {
    	NameDatabaseConnection con=new NameDatabaseConnection(dbName);
    	this.connect=con;
    }
    public synchronized static C3P0Utils getInstance(String dbName) {
        if (dbcputils == null)
            dbcputils = new C3P0Utils(dbName);
        return dbcputils;
    }
    public synchronized static C3P0Utils getInstance() {
        if (dbcputils == null)
            dbcputils = new C3P0Utils(Constants.DB_NAME);
        return dbcputils;
    }

    public Connection getConnection() {
        Connection con = null;
        try {
            con = connect.createConnection();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return con;
    }

    public static void main(String[] args) throws SQLException {
        Connection con = null;
        long begin = System.currentTimeMillis();
        con = C3P0Utils.getInstance().getConnection();
        String sql = "select * from fr_bireportentry";
        PreparedStatement ps = con.prepareStatement(sql);
        ResultSet rs = ps.executeQuery();
        while (rs.next()) {
            System.out.println(rs.getString("ID"));
        }
        rs.close();
        con.close();
        long end = System.currentTimeMillis();
        System.out.println("耗时：" + (end - begin) + "ms");
    }
}
