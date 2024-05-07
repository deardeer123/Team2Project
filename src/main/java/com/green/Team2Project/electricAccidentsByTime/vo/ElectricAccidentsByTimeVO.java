package com.green.Team2Project.electricAccidentsByTime.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ElectricAccidentsByTimeVO {
    private int occurredYear;
    private int hour00_02;
    private int hour02_04;
    private int hour04_06;
    private int hour06_08;
    private int hour08_10;
    private int hour10_12;
    private int hour12_14;
    private int hour14_16;
    private int hour16_18;
    private int hour18_20;
    private int hour20_22;
    private int hour22_24;
}
