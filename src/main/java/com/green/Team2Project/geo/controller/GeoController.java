package com.green.Team2Project.geo.controller;

import com.green.Team2Project.geo.service.GeoService;
import com.green.Team2Project.geo.vo.GeoVO;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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

    @RequestMapping("/geoDetail")
    public String goGeoDetail(){

        return "content/geo_detail";
    }

    // 전체 항목의 평균값 보여주는 메소드
    @ResponseBody
    @PostMapping("/geoDetailSelect")
    public Map<String, Double> geoDetailSelect(@RequestBody GeoVO geoVO){

        List<Map<String, Integer>> geoData = geoService.geoSelect(geoVO);
        Map<String, Double> resultData = new HashMap<>();
        int sum = 0;

        // 값은 key를 가진 값끼리 더해서 평균값 리턴
        resultData = geoData.stream()
                    .flatMap(
                            map -> map.entrySet().stream()
                    ).collect(
                            Collectors.groupingBy(
                                    Map.Entry::getKey,
                                    Collectors.averagingInt(
                                            Map.Entry::getValue)));

        System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@" + resultData);


        return resultData;
    }

//    @ResponseBody
//    @PostMapping("/geoDetailSelect")
//    public List<Map<String, Integer>> geoDetailSelect(@RequestBody GeoVO geoVO){
//
//        List<Map<String, Integer>> totalData = geoService.geoSelect(geoVO);
//        List<Map<String, Integer>> getData;
//        int sum = 0;
//        double avg = 0.0;
//        int cnt = 0;
//
//        for(Map<String, Integer> one : totalData){
//            if(one.containsKey("SEOUL")){
//                sum = sum + one.get("SEOUL");
//                cnt++;
//            }
//        }
//
//        return
//    }
}
