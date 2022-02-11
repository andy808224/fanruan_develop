package com.fr.plugin.function.math;

import com.fr.general.GeneralUtils;
import com.fr.intelli.record.Focus;
import com.fr.record.analyzer.EnableMetrics;
import com.fr.script.AbstractFunction;
import com.fr.stable.ArrayUtils;
import com.fr.stable.Primitive;
import com.fr.stable.exception.FormulaException;

/**
 * @author richie
 * @version 10.0
 * Created by richie on 2020/6/2
 */
@EnableMetrics
public class MaxCommonDivisor extends AbstractFunction {

    @Override
    @Focus(id="com.fr.plugin.function.math", text="")
    public Object run(Object[] args) throws FormulaException {
        int len = ArrayUtils.getLength(args);
        if (len < 2) {
            return Primitive.ERROR_VALUE;
        }
        int m = GeneralUtils.objectToNumber(args[0]).intValue();
        int n = GeneralUtils.objectToNumber(args[1]).intValue();
        return maxCommonDivisor(m, n);
    }

    public static int maxCommonDivisor(int m, int n) {
        if (m < n) {
            int temp = m;
            m = n;
            n = temp;
        }
        if (m % n == 0) {
            return n;
        } else {
            return maxCommonDivisor(n, m % n);
        }
    }
}
