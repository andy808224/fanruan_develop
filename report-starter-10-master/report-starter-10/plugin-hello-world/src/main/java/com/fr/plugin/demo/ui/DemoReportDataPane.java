package com.fr.plugin.demo.ui;

import com.fr.design.formula.TinyFormulaPane;
import com.fr.design.gui.itextfield.UITextField;
import com.fr.extended.chart.AbstractExtendedChartReportDataPane;
import com.fr.plugin.demo.fun.DemoDataConfig;

import java.awt.Component;

/**
 * Created by shine on 2018/3/24.
 */
public class DemoReportDataPane extends AbstractExtendedChartReportDataPane<DemoDataConfig> {

    private TinyFormulaPane xPane;
    private UITextField targetName;
    private TinyFormulaPane yPane;
    private TinyFormulaPane zPane;

    @Override
    protected boolean hasCustomFieldPane() {
        return true;
    }

    @Override
    protected String[] fieldLabel() {
        return new String[]{
                "X轴",
                "指标名",
                "Y轴",
                "Z轴"
        };
    }

    @Override
    protected Component[] fieldComponents() {
        if (xPane == null) {
            xPane = new TinyFormulaPane();
            targetName = new UITextField();
            yPane = new TinyFormulaPane();
            zPane = new TinyFormulaPane();
        }
        return new Component[]{
                xPane,
                targetName,
                yPane,
                zPane
        };
    }

    @Override
    protected TinyFormulaPane[] formulaPanes() {
        if (xPane == null) {
            xPane = new TinyFormulaPane();
            yPane = new TinyFormulaPane();
            zPane = new TinyFormulaPane();
        }
        return new TinyFormulaPane[]{
                xPane,
                yPane,
                zPane
        };
    }

    @Override
    protected void populate(DemoDataConfig dataConf) {
        populateField(xPane, dataConf.getX());
        targetName.setText(dataConf.getTargetName());
        populateField(yPane, dataConf.getY());
        populateField(zPane, dataConf.getZ());
    }

    @Override
    protected DemoDataConfig update() {
        DemoDataConfig dataConfig = new DemoDataConfig();

        updateField(xPane, dataConfig.getX());
        dataConfig.setTargetName(targetName.getText());
        updateField(yPane, dataConfig.getY());
        updateField(zPane, dataConfig.getZ());

        return dataConfig;
    }
}
