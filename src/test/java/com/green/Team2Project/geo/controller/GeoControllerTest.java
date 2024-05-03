package com.green.Team2Project.geo.controller;

import com.green.Team2Project.geo.service.GeoService;
import com.green.Team2Project.geo.vo.GeoVO;
import jakarta.annotation.Resource;
import net.bytebuddy.build.ToStringPlugin;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

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

}