package com.fr.plugin.demo.ui;

import com.fr.design.gui.frpane.AttributeChangeListener;
import com.fr.extended.chart.AbstractExtendedStylePane;
import com.fr.extended.chart.ExtendedScrollPane;
import com.fr.plugin.demo.fun.DemoChart;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by shine on 2018/3/25.
 */
public class DemoStylePane extends AbstractExtendedStylePane<DemoChart>{

    public DemoStylePane(AttributeChangeListener listener) {
        super(listener);
    }

    @Override
    protected List<ExtendedScrollPane<DemoChart>> initPaneList() {
        List<ExtendedScrollPane<DemoChart>> list = new ArrayList<ExtendedScrollPane<DemoChart>>();
        list.add(new DemoTitlePane());
        list.add(new DemoBackgroundPane());
        return list;
    }
}
