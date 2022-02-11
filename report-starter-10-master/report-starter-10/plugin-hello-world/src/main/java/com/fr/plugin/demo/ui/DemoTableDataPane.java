package com.fr.plugin.demo.ui;

import com.fr.design.gui.icombobox.UIComboBox;
import com.fr.design.gui.itextfield.UITextField;
import com.fr.design.mainframe.chart.gui.data.CalculateComboBox;
import com.fr.extended.chart.AbstractExtendedChartTableDataPane;
import com.fr.extended.chart.ExtendedCustomFieldComboBoxPane;
import com.fr.plugin.demo.fun.DemoDataConfig;

import java.awt.Component;

/**
 * Created by shine on 2018/3/24.
 */
public class DemoTableDataPane extends AbstractExtendedChartTableDataPane<DemoDataConfig>{
    private UIComboBox xComboBox;
    private UITextField targetName;
    private UIComboBox yComboBox;
    private UIComboBox zComboBox;

    private UIComboBox expect;
    private CalculateComboBox expectFunction;
    private UIComboBox actual;
    private CalculateComboBox actualFunction;

   // private UIComboBoxWithNone seriesName;

    @Override
    protected ExtendedCustomFieldComboBoxPane createExtendedCustomFieldComboBoxPane() {
        return new ExtendedCustomFieldComboBoxPane();
    }

    @Override
    protected String[] fieldLabels() {
        return new String[]{
                "X轴",
                "指标名",
                "Y轴",
                "Z轴",
//                "预期值",
//                "预期汇总方式",
//                "实际值",
//                "实际汇总方式"
        };
    }

    @Override
    protected Component[] fieldComponents() {
        if (xComboBox == null) {
            xComboBox = new UIComboBox();
            targetName = new UITextField();
            yComboBox = new UIComboBox();
            zComboBox = new UIComboBox();
            expect = new UIComboBox();
            expectFunction = new CalculateComboBox();
            actual = new UIComboBox();
            actualFunction = new CalculateComboBox();
        }
        return new Component[]{
                xComboBox,
                targetName,
                yComboBox,
                zComboBox,
                expect,
                expectFunction,
                actual,
                actualFunction
        };
    }

    @Override
    protected UIComboBox[] filedComboBoxes() {
        if (xComboBox == null) {
            xComboBox = new UIComboBox();
            yComboBox = new UIComboBox();
            zComboBox = new UIComboBox();
            expect = new UIComboBox();
            actual = new UIComboBox();
        }
        return new UIComboBox[]{
                xComboBox,
                yComboBox,
                zComboBox,
                expect,
                actual
        };
    }

    @Override
    protected void populate(DemoDataConfig dataConf) {
        populateField(xComboBox, dataConf.getX());
        targetName.setText(dataConf.getTargetName());
        populateField(yComboBox, dataConf.getY());
        populateField(zComboBox, dataConf.getZ());

        populateFunctionField(expect, expectFunction, dataConf.getExpect());
        populateFunctionField(actual, actualFunction, dataConf.getActual());
    }

    @Override
    protected DemoDataConfig update() {
        DemoDataConfig dataConfig = new DemoDataConfig();

        updateField(xComboBox, dataConfig.getX());
        dataConfig.setTargetName(targetName.getText());
        updateField(yComboBox, dataConfig.getY());
        updateField(zComboBox, dataConfig.getZ());

        updateFunctionField(expect, expectFunction, dataConfig.getExpect());
        updateFunctionField(actual, actualFunction, dataConfig.getActual());

        return dataConfig;
    }
}
