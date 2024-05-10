package com.green.Team2Project.range.vo;

import lombok.Data;

@Data
public class RangeVO {
    private int occurredYear;
    private int burnrange0_5;
    private int burnrange6_10;
    private int burnrange11_21;
    private int burnrange21_30;
    private int burnrange31_40;
    private int burnrange41_50;
    private int burnrange51_60;
    private int burnrange60_over;



    private double AVG05;
    private double AVG610;
    private double AVG1120;
    private double AVG2130;
    private double AVG3140;
    private double AVG4150;
    private double AVG5160;
    private double AVG60OVER;
    private double total;
    private double total_avg;



}
