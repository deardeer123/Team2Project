package com.green.Team2Project.electricAccidentsByDay.controller;

import com.green.Team2Project.electricAccidentsByDay.service.ElectricAccidentsByDayService;
import com.green.Team2Project.electricAccidentsByDay.vo.ElectricAccidentsByDayVO;
import com.green.Team2Project.home.vo.SearchVO;
import jakarta.annotation.Resource;
import org.apache.ibatis.annotations.ResultMap;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/day")
public class ElectricAccidentsByDayController {
    @Resource(name = "electricAccidentsByDayService")
    ElectricAccidentsByDayService electricAccidentsByDayService;

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
        model.addAttribute("avgData", map);
        model.addAttribute("allData", electricAccidentsByDayService.allDay());
        return "content/day/detailDay";
    }

    //도넛 차트 데이터 넘겨주기
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

}
