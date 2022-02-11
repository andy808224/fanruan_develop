package com.fr.hailian.util;

import java.beans.PropertyVetoException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.fr.hailian.core.Constants;
import com.mchange.v2.c3p0.ComboPooledDataSource;
/**
 * @className C3P0Utils.java
 * @time   2017年8月12日 上午8:53:54
 * @author zuoqb
 * @todo  数据库工具类
 */
public class C3P0Utils2 extends Constants{/*
    private static C3P0Utils2 dbcputils = null;
    private ComboPooledDataSource cpds = null;

    private C3P0Utils2() {
        if (cpds == null) {
            cpds = new ComboPooledDataSource();
        }
        cpds.setUser(username);
        cpds.setPassword(password);
        cpds.setJdbcUrl(url);
        try {
            cpds.setDriverClass(driverclass);
        } catch (PropertyVetoException e) {
            e.printStackTrace();
        }
        cpds.setInitialPoolSize(100);
        cpds.setMaxIdleTime(20);
        cpds.setMaxPoolSize(100);
        cpds.setMinPoolSize(10);
    }

    public C3P0Utils2(String url, String username, String password) {

        cpds = new ComboPooledDataSource();
        cpds.setUser(username);
        cpds.setPassword(password);
        cpds.setJdbcUrl(url);
        try {
            cpds.setDriverClass(driverclass);
        } catch (PropertyVetoException e) {
            e.printStackTrace();
        }
        cpds.setInitialPoolSize(100);
        cpds.setMaxIdleTime(20);
        cpds.setMaxPoolSize(100);
        cpds.setMinPoolSize(10);
    }

    public synchronized static C3P0Utils2 getInstance() {
        if (dbcputils == null)
            dbcputils = new C3P0Utils2();
        return dbcputils;
    }

    public synchronized static C3P0Utils2 getInstance(String url,
            String username, String password) {
        return new C3P0Utils2(url, username, password);
    }

    public Connection getConnection() {
        Connection con = null;
        try {
            con = cpds.getConnection();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return con;
    }

    public static void main(String[] args) throws SQLException {
        Connection con = null;
        long begin = System.currentTimeMillis();
        con = C3P0Utils2.getInstance().getConnection();
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
*/}
