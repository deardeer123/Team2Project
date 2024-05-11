package com.green.Team2Project.geo.controller;

import com.green.Team2Project.geo.service.GeoService;
import com.green.Team2Project.geo.vo.GeoVO;
import jakarta.annotation.Resource;
import net.bytebuddy.build.ToStringPlugin;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.BigDecimal;
import java.time.Year;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;



@SpringBootTest
class GeoControllerTest {
    @Resource(name="geoService")
    GeoService geoService;

    @Test
    public void 지오테스트(){
        int occurredYear = 0;
        GeoVO geoVO = new GeoVO();
        geoVO.setOccurredYear(occurredYear);

        List<Map<String, Integer>> a = geoService.geoSelect(geoVO);
        a.forEach(s-> System.out.println(s));
    }
    @Test
    public void 그냥테스트(){
        Map<String ,Object> map = new HashMap<>();
        List<Integer> yearList = geoService.selectYearList();
        yearList.forEach(s->{
            List<Integer> dataList = new ArrayList<>();
            Map<String, Object> data = geoService.selectCapitalAreaDataOne(s);
            data.forEach((key, value)->{
                dataList.add((Integer) value);
            });
            map.put(String.valueOf(s),dataList);
        });
        Map<String, Object> totalData = geoService.totalCapitalAreaData();
        List<String> korList = new ArrayList<>(totalData.keySet());
        System.out.println(korList);
        int max = 0; int max2 = 0; String maxArea = "";
        for(String e : totalData.keySet()){
            BigDecimal a = (BigDecimal) totalData.get(e);
            int b = a.intValue();
            max2 += b;
            if(b>max){
                max = b;
                maxArea = e;
            }
        }
        System.out.println("max2 " + max2);
        System.out.println("map " + map);
        System.out.println("totalData " + totalData);
        System.out.println("yearList " + yearList);
        System.out.println("korList " + korList);

    }

}