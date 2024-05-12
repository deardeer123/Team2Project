package com.green.Team2Project.home.controller;
import com.green.Team2Project.geo.service.GeoService;
import com.green.Team2Project.geo.vo.GeoVO;
import com.green.Team2Project.home.service.HomeService;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.*;

@Controller
@RequestMapping("/")
public class HomeController {
    @Resource(name="homeService")
    private HomeService homeService;

    @Resource(name="geoService")
    private GeoService geoService;

    @GetMapping("/home")
    public String helloWorld(){
        System.out.println("hello world!");

        return"content/home";
    }
    @ResponseBody
    @GetMapping("/geoData/{area}")
    public List<Integer> mainGeoData(@PathVariable(name="area")String area){
        System.out.println(area);
//        영어이름
        String engArea = "";
        switch (area){
            case "서울시" :
//                1
                engArea = "SEOUL";
                break;
            case "경기도" :
//                2
                engArea = "GYEONGGI";
                break;
            case "인천시" :
//                3
                engArea = "INCHEON";
                break;
            case "강원도" :
//                4
                engArea = "GANGWON";
                break;
            case "충청북도" :
//                5
                engArea = "CHUNGBUK";
                break;
            case "세종시" :
//                6
                engArea = "SEJONG";
                break;
            case "대전시" :
//                7
                engArea = "DAEJEON";
                break;
            case "경상북도" :
//                8
                engArea = "GYEONGNUK";
                break;
            case "대구시" :
//                9
                engArea = "DAEGU";
                break;
            case "경상남도" :
//                10
                engArea = "GYEONGNAM";
                break;
            case "울산시" :
//                11
                engArea = "ULSAN";
                break;
            case "부산시" :
//                12
                engArea = "BUSAN";
                break;
            case "전라북도" :
//                13
                engArea = "JEONBUK";
                break;
            case "전라남도" :
//                14
                engArea = "JEONNAM";
                break;
            case "광주시" :
//                15
                engArea = "GWANGJU";
                break;
            case "제주도" :
//                16
                engArea = "JEJU";
                break;
            case "충청남도" :
//                17
                engArea = "CHUNGNAM";
                break;
        }
        //영어이름 홗인
//        System.out.println(engArea);

//      영어이름으로 데이터 받아오기
        List<Map<String,Integer>> list2 = geoService.mainGeoData(engArea);
//        list2.forEach(s-> System.out.println(s));//확인
//        던져줄 리스트 만들기
        List<Integer> data = new ArrayList<>();
//        받은데이터 반복
        String finalEngArea = engArea;
        list2.forEach(s->{
            int areaData = s.get(finalEngArea); //바로 못쓰나봄 년도에 해당하는 지역데이터
            data.add(areaData); //값 넣기
        });
        System.out.println(data);//확인
        return data;
    }
    @ResponseBody
    @GetMapping("/geoData/avg")
    public Map<String, Object> mainAvgData(){
        System.out.println("평균값");
        return geoService.mainAvgAreaData();
    }

}
