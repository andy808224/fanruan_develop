package com.fr.plugin.demo.fun;

import com.fr.extended.chart.AbstractChart;
import com.fr.extended.chart.HyperLinkPara;
import com.fr.extended.chart.StringFormula;
import com.fr.extended.chart.export.ExportProcessor;
import com.fr.extended.chart.export.JSExportProcessor;
import com.fr.general.GeneralUtils;
import com.fr.intelli.record.Focus;
import com.fr.intelli.record.Original;
import com.fr.json.JSON;
import com.fr.json.JSONArray;
import com.fr.json.JSONException;
import com.fr.json.JSONFactory;
import com.fr.json.JSONObject;
import com.fr.record.analyzer.EnableMetrics;
import com.fr.stable.AssistUtils;
import com.fr.stable.web.Repository;
import com.fr.stable.xml.XMLPrintWriter;
import com.fr.stable.xml.XMLableReader;

import java.util.ArrayList;
import java.util.List;

/**
 * 后台图表对象
 */
@EnableMetrics
public class DemoChart extends AbstractChart<DemoDataConfig> {

    private static final String ID = "DEMO_CHART";
    private static final String NAME = "DEMO图表";

    private StringFormula titleFormula = new StringFormula();

    private ThemeType themeType = ThemeType.DARK;

    private boolean threeDimensional = false;

    public boolean isThreeDimensional() {
        return threeDimensional;
    }

    public void setThreeDimensional(boolean threeDimensional) {
        this.threeDimensional = threeDimensional;
    }

    public ThemeType getThemeType() {
        return themeType;
    }

    public void setThemeType(ThemeType themeType) {
        this.themeType = themeType;
    }

    public StringFormula getTitleFormula() {
        return titleFormula;
    }

    public void setTitleFormula(StringFormula titleFormula) {
        this.titleFormula = titleFormula;
    }

    @Override
    protected void readAttr(XMLableReader reader) {
        super.readAttr(reader);
        this.setThemeType(ThemeType.parseInt(reader.getAttrAsInt("theme", 0)));
        this.setThreeDimensional(reader.getAttrAsBoolean("threeD", false));
        this.getTitleFormula().readAttr("title", reader);
    }

    @Override
    protected void writeAttr(XMLPrintWriter writer) {
        super.writeAttr(writer);
        writer.attr("theme", getThemeType().ordinal());
        writer.attr("threeD", isThreeDimensional());
        this.getTitleFormula().writeAttr("title", writer);
    }

    @Override
    public Object clone() throws CloneNotSupportedException {
        DemoChart result = (DemoChart) super.clone();
        if (getTitleFormula() != null) {
            result.setTitleFormula(this.getTitleFormula().clone());
        }
        result.setThemeType(this.getThemeType());
        result.setThreeDimensional(this.isThreeDimensional());
        return result;
    }


    @Override
    protected String getChartID() {
        return ID;
    }

    @Override
    public String getChartName() {
        return NAME;
    }

    @Override
    protected String demoImagePath() {
        return "com/fr/plugin/demo/demo.png";
    }

    @Override
    @Focus(id = DemoChartConstants.PLUGIN_ID, text = "", source = Original.PLUGIN)
    protected void addJSON(DemoDataConfig dataConfig, JSONObject jsonObject, Repository repo, JSONPara para) throws JSONException {
        jsonObject.put("theme", getThemeType() == ThemeType.DARK ? "dark" : "sth whatever");

        jsonObject.put("title", JSONFactory.createJSON(JSON.OBJECT).put("text", getTitleFormula().getResult()));

        JSONArray array = JSONFactory.createJSON(JSON.ARRAY);

        double maxValue = Double.MIN_VALUE;

        if (dataConfig != null) {
            List<Object> xValues = dataConfig.getX().getValues();
            List<Object> yValues = dataConfig.getY().getValues();
            List<Object> zValues = dataConfig.getZ().getValues();

            //  jsonObject.put("targetName", dataConfig.getTargetName());

//            List<Object> expectList = dataConfig.getExpect().getValues();
//            List<Object> actualList = dataConfig.getActual().getValues();

            List<Object> customNames = dataConfig.getCustomNameField().getValues();
            List<Object> customValues = dataConfig.getCustomValueField().getValues();

            for (int i = 0, len = xValues.size(); i < len; i++) {
                maxValue = Math.max(GeneralUtils.objectToNumber(zValues.get(i)).doubleValue(), maxValue);

                array.put(JSONFactory.createJSON(JSON.ARRAY).put(xValues.get(i)).put(yValues.get(i)).put(zValues.get(i)));
            }
        }

        jsonObject.put("series", JSONFactory.createJSON(JSON.OBJECT).put("type", "bar3D").put("data", array)
                .put("bevelSize", 0.2).put("bevelSmoothness", 2).put("shading", "color"));

        jsonObject.put("xAxis3D", JSONFactory.createJSON(JSON.OBJECT).put("type", "category"))
                .put("yAxis3D", JSONFactory.createJSON(JSON.OBJECT).put("type", "category"))
                .put("zAxis3D", JSONFactory.createJSON(JSON.OBJECT).put("type", "value"));

        jsonObject.put("grid3D", JSONFactory.createJSON(JSON.OBJECT).put("boxWidth", 200).put("boxDepth", 80));

        jsonObject.put("visualMap", JSONFactory.createJSON(JSON.OBJECT)
                .put("max", maxValue)
                .put("color", JSONFactory.createJSON(JSON.ARRAY).put("#d94e5d").put("#eac736").put("#50a3ba")));
    }

    @Override
    protected String[] requiredJS() {
        return new String[]{
                "com/fr/plugin/demo/demoWrapper.js",
                "com/fr/plugin/demo/echarts.js",
                "com/fr/plugin/demo/echarts-gl.js"
        };
    }

    @Override
    protected String[] requiredCSS() {
        return new String[]{
                "com/fr/plugin/demo/demo.css"
        };
    }

    @Override
    protected String wrapperName() {
        return "demoWrapper";
    }

    private static final HyperLinkPara X = new HyperLinkPara() {
        @Override
        public String getName() {
            return "X轴";
        }

        @Override
        public String getFormulaContent() {
            return "X";
        }

        @Override
        public String[] getProps() {
            return new String[]{"data", "0"};
        }
    };

    private static final HyperLinkPara Y = new HyperLinkPara() {
        @Override
        public String getName() {
            return "Y轴";
        }

        @Override
        public String getFormulaContent() {
            return "Y";
        }

        @Override
        public String[] getProps() {
            return new String[]{"data", "1"};
        }
    };

    private static final HyperLinkPara[] PARAS = new HyperLinkPara[]{
            X,
            Y
    };

    @Override
    protected HyperLinkPara[] hyperLinkParas() {
        return PARAS;
    }

    @Override
    protected List<StringFormula> formulas() {
        List<StringFormula> list = new ArrayList<StringFormula>();
        list.add(this.getTitleFormula());
        return list;
    }

//    @Override
    protected ExportProcessor createExportProcessor() {
        return new JSExportProcessor();
    }

    @Override
    public int hashCode() {
        return super.hashCode() + AssistUtils.hashCode(this.getTitleFormula(), this.getThemeType(), this.isThreeDimensional());
    }

    @Override
    public boolean equals(Object ob) {
        return super.equals(ob)
                && ob instanceof DemoChart
                && AssistUtils.equals(this.getTitleFormula(), ((DemoChart) ob).getTitleFormula())
                && AssistUtils.equals(this.getThemeType(), ((DemoChart) ob).getThemeType())
                && AssistUtils.equals(this.isThreeDimensional(), ((DemoChart) ob).isThreeDimensional());
    }
}
