package com.green.Team2Project.home.controller;
import com.green.Team2Project.disaster.service.DisasterService;
import com.green.Team2Project.disaster.vo.DisasterVO;
import com.green.Team2Project.electricAccidentsByDay.service.ElectricAccidentsByDayService;
import com.green.Team2Project.electricAccidentsByTime.service.ElectricAccidentsByTimeService;
import com.green.Team2Project.electricAccidentsByTime.vo.ElectricAccidentsByTimeVO;
import com.green.Team2Project.geo.service.GeoService;
import com.green.Team2Project.geo.vo.GeoVO;
import com.green.Team2Project.home.service.HomeService;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.math.BigDecimal;
import java.nio.channels.Pipe;
import java.util.*;

@Controller
@RequestMapping("/")
public class HomeController {
    @Resource(name="homeService")
    private HomeService homeService;

    @Resource(name="geoService")
    private GeoService geoService;

    @Resource(name="electricAccidentsByDayService")
    private ElectricAccidentsByDayService electricAccidentsByDayService;

    @Resource(name ="electricAccidentsByTimeService")
    private ElectricAccidentsByTimeService electricAccidentsByTimeService;

    @Resource(name="disasterService")
    private DisasterService disasterService;




    @GetMapping("/home")
    public String helloWorld(Model model){
        System.out.println("hello world!");
        //메인화면에 던져줄 데이터1(전기화재 현황)
        DisasterVO disasterVO = disasterService.mainAvgDisaster();
        System.out.println(disasterVO);
        model.addAttribute("disaster" ,disasterVO);

        //메인화면에 던져줄 데이터2 (사고 최다 발생요일)
        Map<String, Object> mainDayData = electricAccidentsByDayService.avgDay2();

        //mainDayData 있는 최대 요일 및 데이터 구하기
        String maxDay = "";
        float maxDayData = 0.0f;
        for(String e : mainDayData.keySet()){
            //계속 형변환 오류뜸
            BigDecimal a = (BigDecimal) mainDayData.get(e);
            float b = a.floatValue();
            if(b > maxDayData){
                maxDayData = b;
                maxDay = e;
            }
        }
        //반올림
//        maxDayData = Math.round(maxDayData);
        model.addAttribute("maxDay", maxDay);
        model.addAttribute("maxDayData", maxDayData);

        //메인화면에 던져줄 데이터3 (사고 최다 발생 시간대)
        Map<String, Object> mainTimeData = electricAccidentsByTimeService.selectAvgTimeDataList2();

        String maxTime ="";
        float maxTimeData = 0.0f;
        for(String e : mainTimeData.keySet()){
            //계속 형변환 오류뜸
            BigDecimal a = (BigDecimal) mainTimeData.get(e);
            float b = a.floatValue();
            if(b > maxDayData){
                maxTimeData = b;
                maxTime = e;
            }
        }
        model.addAttribute("maxTime", maxTime);
        model.addAttribute("maxTimeData", maxTimeData);

        //2022년 총 사고
        model.addAttribute("totalAccData", homeService.totalAccData(2022));
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
    @ResponseBody
    @GetMapping("/hourData/avg")
    public Map<String,Object> mainAvgHourData(){
        System.out.println("시간 평균");
        return electricAccidentsByTimeService.selectAvgTimeDataList();
    }

}
