package com.green.Team2Project.geo.controller;

import com.green.Team2Project.geo.service.GeoService;
import com.green.Team2Project.geo.service.GeoServiceImpl;
import com.green.Team2Project.geo.vo.GeoVO;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Type;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
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

        return "content/team2_geo_detail";
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
    @GetMapping("/detail")
    public String goDetailGeo(Model model){
        System.out.println("지역별 감전사고 데이터");
        //처음에 상세페이지이 들어가면 전체 메뉴
        model.addAttribute("geoMenu", "all");
        GeoVO geoVO = new GeoVO();
        geoVO.setOccurredYear(0);
        List<Map<String,Integer>> mapList = geoService.geoSelect(geoVO);
        System.out.println(mapList);
        //그냥 데이터
        model.addAttribute("data", mapList);
        //총합 데이터
        Map<String,Object> totalData = geoService.totalAreaData();
        model.addAttribute("totalData", totalData);
        //총합 데이터 중에 제일 큰값
        int max = 0;
        //합계
        int max2 = 0;
        String maxArea = "";
        for(String e : totalData.keySet()){
            //형변환 드럽게 안됨
            BigDecimal a = (BigDecimal) totalData.get(e);
            int b = a.intValue();
            max2 += b;
            if(b>max){
                max = b;
                maxArea = e;
            }
        }
        model.addAttribute("maxArea", maxArea);
        model.addAttribute("max", max);
        model.addAttribute("max2", max2);

        return "content/geo/geoDetail";
    }
    @ResponseBody
    @GetMapping("/detail/{area}")
    public Map<String, Object> areaDetail(@PathVariable(name="area")String area){
        Map<String, Object> map = new HashMap<>();
        List<Integer> yearList = geoService.selectYearList();
        //전체지역 데이터
        if(area.equals("all")){
            //연도 데이터
            yearList.forEach(s->{
                //연도 데이터 받을 리스트
                List<Integer> dataList = new ArrayList<>();
                //해당연도 데이터를 받아옴
                Map<String,Object> data = geoService.selectAreaDataOne(s);
                //키이름을 연도로 두고, 해당하는 연도 데이터 저장하기
                data.forEach((key,value)->{
                    dataList.add((Integer) value);
                });
                map.put(String.valueOf(s),dataList);
                //2016:[검색 데이터] 이렇게 담김
            });
            //전체지역 총 데이터(전체)
            Map<String, Object> totalData = geoService.totalAreaData();
            //다 더한 값
            int max = 0;
            //합계
            int max2 = 0;
            String maxArea = "";
            //한글로 된 지역명
            List<String> korList = new ArrayList<>(totalData.keySet());
            //전체에서 제일 사고가 많이난 지역, 선택한 지역의 총 사고건수
            for(String e : totalData.keySet()){
                //형변환 드럽게 안됨
                BigDecimal a = (BigDecimal) totalData.get(e);
                int b = a.intValue();
                max2 += b;
                if(b>max){
                    max = b;
                    maxArea = e;
                }
            }
            //map에 담기
            map.put("yearList", yearList);
            map.put("totalData", totalData);
            map.put("maxArea", maxArea);
            map.put("max2", max2);
            map.put("korList", korList);
        }else if(area.equals("capital")){
            //수도권 코드
            //그냥 주석 참고
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
            map.put("yearList", yearList);
            map.put("totalData", totalData);
            map.put("maxArea", maxArea);
            map.put("max2", max2);
            map.put("korList", korList);

        }else if(area.equals("middle")){
            //중부권
            //연도 데이터
            yearList.forEach(s->{
                List<Integer> dataList = new ArrayList<>();
                Map<String, Object> data = geoService.selectMiddleAreaDataOne(s);
                data.forEach((key, value)->{
                    dataList.add((Integer) value);
                });
                map.put(String.valueOf(s),dataList);
            });
            Map<String, Object> totalData = geoService.totalMiddleAreaData();
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
            map.put("yearList", yearList);
            map.put("totalData", totalData);
            map.put("maxArea", maxArea);
            map.put("max2", max2);
            map.put("korList", korList);
        }else if(area.equals("south")){
            //남부권
            //연도 데이터
            yearList.forEach(s->{
                List<Integer> dataList = new ArrayList<>();
                Map<String, Object> data = geoService.selectSouthAreaDataOne(s);
                data.forEach((key, value)->{
                    dataList.add((Integer) value);
                });
                map.put(String.valueOf(s),dataList);
            });
            Map<String, Object> totalData = geoService.totalSouthAreaData();
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
            map.put("yearList", yearList);
            map.put("totalData", totalData);
            map.put("maxArea", maxArea);
            map.put("max2", max2);
            map.put("korList", korList);
        }

        return map;
    }
}
