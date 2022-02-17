package com.fr.plugin.demo.fun;

import com.fr.extended.chart.AbstractDataConfig;
import com.fr.extended.chart.ExtendedField;
import com.fr.stable.AssistUtils;
import com.fr.stable.xml.XMLPrintWriter;
import com.fr.stable.xml.XMLableReader;

/**
 * Created by shine on 2018/3/24.
 */
public class DemoDataConfig extends AbstractDataConfig {

    private ExtendedField x = new ExtendedField();
    private String targetName;
    private ExtendedField y = new ExtendedField();
    private ExtendedField z = new ExtendedField();

    private ExtendedField expect = new ExtendedField();
    private ExtendedField actual = new ExtendedField();

    public ExtendedField getX() {
        return x;
    }

    public void setX(ExtendedField x) {
        this.x = x;
    }

    public ExtendedField getY() {
        return y;
    }

    public void setY(ExtendedField y) {
        this.y = y;
    }

    public ExtendedField getZ() {
        return z;
    }

    public void setZ(ExtendedField z) {
        this.z = z;
    }

    public String getTargetName() {
        return targetName;
    }

    public void setTargetName(String targetName) {
        this.targetName = targetName;
    }

    public ExtendedField getExpect() {
        return expect;
    }

    public void setExpect(ExtendedField expect) {
        this.expect = expect;
    }

    public ExtendedField getActual() {
        return actual;
    }

    public void setActual(ExtendedField actual) {
        this.actual = actual;
    }

    @Override  //读取数据库中数据并渲染到模板对象上，在浏览器上进行展示
    protected void readAttr(XMLableReader reader) {
        readExtendedField(x, "x", reader); //第二个参数是字段写入模板对应的key
        this.setTargetName(reader.getAttrAsString("targetName", ""));
        readExtendedField(y, "y", reader);
        readExtendedField(z, "z", reader);
        readExtendedField(expect, "expect", reader);
        readExtendedField(actual, "actual", reader);
    }

    @Override
    protected void writeAttr(XMLPrintWriter writer) {
        writeExtendedField(x, "x", writer);  //第二个参数是字段写入模板对应的key
        writer.attr("targetName", this.getTargetName());
        writeExtendedField(y, "y", writer);
        writeExtendedField(z, "z", writer);
        writeExtendedField(expect, "expect", writer);
        writeExtendedField(actual, "actual", writer);
    }

    @Override
    public ExtendedField[] dataSetFields() {
        return new ExtendedField[]{
                x,
                y,
                z,
                expect,
                actual
        };
    }

    @Override
    public DemoDataConfig clone() throws CloneNotSupportedException {
        DemoDataConfig result = (DemoDataConfig)super.clone();
        result.setX(this.getX().clone());
        result.setTargetName(this.getTargetName());
        result.setY(this.getY().clone());
        result.setZ(this.getZ().clone());
        result.setExpect(this.getExpect().clone());
        result.setActual(this.getActual().clone());
        return result;
    }

    @Override
    public int hashCode() {
        return super.hashCode() + AssistUtils.hashCode(this.getX(), this.getY(), this.getZ(),
                this.getTargetName(), this.getExpect(), this.getActual());
    }

    @Override
    public boolean equals(Object obj) {
        return obj instanceof DemoDataConfig
                && super.equals(obj)
                && AssistUtils.equals(this.getX(), ((DemoDataConfig) obj).getX())
                && AssistUtils.equals(this.getTargetName(), ((DemoDataConfig) obj).getTargetName())
                && AssistUtils.equals(this.getY(), ((DemoDataConfig) obj).getY())
                && AssistUtils.equals(this.getZ(), ((DemoDataConfig) obj).getZ())
                && AssistUtils.equals(this.getExpect(), ((DemoDataConfig) obj).getExpect())
                && AssistUtils.equals(this.getActual(), ((DemoDataConfig) obj).getActual());
    }
}
