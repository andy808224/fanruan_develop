package com.fr.plugin.demo.ui;

import com.fr.design.formula.TinyFormulaPane;
import com.fr.extended.chart.ExtendedScrollPane;
import com.fr.plugin.demo.fun.DemoChart;

import javax.swing.JPanel;
import java.awt.BorderLayout;

/**
 * Created by shine on 2018/3/25.
 */
public class DemoTitlePane extends ExtendedScrollPane<DemoChart>{
    private TinyFormulaPane title;
    @Override
    public void populateBean(DemoChart ob) {
        title.populateBean(ob.getTitleFormula().getContent());
    }

    @Override
    public void updateBean(DemoChart ob) {
        ob.getTitleFormula().setContent(title.updateBean());
    }

    @Override
    protected JPanel createContentPane() {
        JPanel panel = new JPanel(new BorderLayout());
        title = new TinyFormulaPane();
        panel.add(title, BorderLayout.CENTER);
        return panel;
    }

    @Override
    protected String title4PopupWindow() {
        return "标题";
    }
}
