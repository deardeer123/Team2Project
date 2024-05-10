package com.green.Team2Project.electricAccidentsByDay.controller;

import com.green.Team2Project.electricAccidentsByDay.service.ElectricAccidentsByDayService;
import com.green.Team2Project.electricAccidentsByDay.vo.ElectricAccidentsByDayVO;
import com.green.Team2Project.electricAccidentsByTime.service.ElectricAccidentsByTimeService;
import com.green.Team2Project.electricAccidentsByTime.vo.ElectricAccidentsByTimeVO;
import com.green.Team2Project.home.vo.SearchVO;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpSession;
import org.apache.ibatis.annotations.ResultMap;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/day")
public class ElectricAccidentsByDayController {
    @Resource(name = "electricAccidentsByDayService")
    ElectricAccidentsByDayService electricAccidentsByDayService;

    @Resource(name = "electricAccidentsByTimeService")
    ElectricAccidentsByTimeService electricAccidentsByTimeService;

    @ResponseBody
    @PostMapping("/getDayFetch")
    public ElectricAccidentsByDayVO getDateFetch( ){


        ElectricAccidentsByDayVO electricAccidentsByDayVO = electricAccidentsByDayService.selectAccidentDay();

        return electricAccidentsByDayVO;
    }
    @GetMapping("/test")
    public String test1(Model model){
        System.out.println("test");
        model.addAttribute("selectedMenu", 1);
        return "content/test/test";
    }

    //메뉴 3번
    @GetMapping("/")
    public String detailDay(Model model){
        System.out.println("감전사고인명피해 시간 & 요일");
        Map<String,Object> map = electricAccidentsByDayService.avgDay();
        System.out.println(map);
        map.put("occurredYear", "avg");

        model.addAttribute("selectedMenu", 3);

        //요일 데이터
        model.addAttribute("avgData", map);
        model.addAttribute("year", "avg");
        model.addAttribute("allData", electricAccidentsByDayService.allDay());

        //시간 데이터
        model.addAttribute("dayTimeData", electricAccidentsByTimeService.selectDayTimeList(0));
        model.addAttribute("time", "day");

        return "content/day/detailDay";
    }

    //차트 데이터 넘겨주기
    @ResponseBody
    @PostMapping("/changeChart/{avg}")
    public Map<String , Object> changeChart(@PathVariable(name = "avg")String avg){
        if(avg.equals("avg")){
            Map<String , Object> map = electricAccidentsByDayService.avgDay();
            map.put("occurredYear", "avg");

            return map;
        }else{
            int occurredYear = Integer.parseInt(avg);

            return electricAccidentsByDayService.selectDay(occurredYear);
        }
    }
    //차트 데이터 넘겨주기2
    @ResponseBody
    @GetMapping("/timeData/{time}")
    public List<ElectricAccidentsByTimeVO> changeChart2(@PathVariable(name="time")String time){
        System.out.println(time);
        if(time.equals("day")){
            return electricAccidentsByTimeService.selectDayTimeList(0);
        }else if(time.equals("night")){
            return electricAccidentsByTimeService.selectNightList(0);
        }else {
            return electricAccidentsByTimeService.selectLateNightList(0);
        }
    }
    @ResponseBody
    @GetMapping("/timeData/avg")
    public Map<String, Object> changeChart3(){
        Map<String, Object> map = electricAccidentsByTimeService.selectAvgTimeDataList();
        Map<String, Object> map2 = electricAccidentsByTimeService.selectAllTimeDataList();
        Map<String, Object> map3 = new HashMap<>();
        map3.put("avg", map);
        map3.put("all", map2);

        return map3;
    }
}
