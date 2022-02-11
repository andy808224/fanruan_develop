package com.fr.plugin.demo;

import com.fr.design.gui.frpane.AttributeChangeListener;
import com.fr.design.mainframe.chart.AbstractChartAttrPane;
import com.fr.design.mainframe.chart.gui.data.report.AbstractReportDataContentPane;
import com.fr.design.mainframe.chart.gui.type.AbstractChartTypePane;
import com.fr.extended.chart.AbstractExtendedChartTableDataPane;
import com.fr.extended.chart.AbstractExtendedChartUIProvider;
import com.fr.extended.chart.ExtendedOtherPane;
import com.fr.plugin.demo.ui.DemoReportDataPane;
import com.fr.plugin.demo.ui.DemoStylePane;
import com.fr.plugin.demo.ui.DemoTableDataPane;
import com.fr.plugin.demo.ui.DemoTypePane;

/**
 * Created by shine on 2018/3/24.
 */
public class DemoUI extends AbstractExtendedChartUIProvider {

    @Override
    public AbstractChartTypePane getPlotTypePane() {
        return new DemoTypePane();
    }

    @Override
    protected AbstractExtendedChartTableDataPane getTableDataSourcePane() {
        return new DemoTableDataPane();
    }

    @Override
    protected AbstractReportDataContentPane getReportDataSourcePane() {
        return new DemoReportDataPane();
    }

//    @Override
//    public ChartDataPane getChartDataPane(AttributeChangeListener listener) {
//        return null;
//    }

    @Override
    public String getIconPath() {
        return "com/fr/plugin/demo/icon.png";
    }

    @Override
    public AbstractChartAttrPane[] getAttrPaneArray(AttributeChangeListener listener) {
        return new AbstractChartAttrPane[]{
                new DemoStylePane(listener),
                new ExtendedOtherPane()
        };
    }

    public String[] getDemoImagePath() {
        return new String[]{
                "com/fr/plugin/demo/demo.png"
        };
    }
}
