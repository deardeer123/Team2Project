package com.green.Team2Project.geo.controller;

import com.green.Team2Project.geo.service.GeoService;
import com.green.Team2Project.geo.vo.GeoVO;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/geo")
public class GeoController {
    @Resource(name = "geoService")
    GeoService geoService;

    @ResponseBody
    @PostMapping("/geoSelect")
    public List<Map<String, Integer>> geoSelect(@RequestBody GeoVO geoVO){

        System.out.println("지도 데이터 실행~");

        List<Map<String, Integer>> list = geoService.geoSelect(geoVO);

        System.out.println(list);

        return list;
    }
}
