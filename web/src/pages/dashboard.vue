<template>
    <div>
        <div id="pie" style="width: 600px;height:400px;"></div>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-table :data="props.row.jobList" label-position="left" inline>
                        <el-table-column
                                type="index">
                        </el-table-column>
                        <el-table-column
                                label="JobName"
                                prop="jobName"
                                width="300px">
                        </el-table-column>
                        <el-table-column
                                label="Total testcase"
                                prop="totalCount"
                                width="110px">
                        </el-table-column>
                        <el-table-column
                                label="Success testcase"
                                prop="successCount"
                                width="120px">
                        </el-table-column>
                        <el-table-column
                                label="Fail testcase"
                                prop="failCount"
                                width="100px">
                        </el-table-column>
                        <el-table-column
                                label="Skip testcase"
                                prop="skipCount"
                                width="100px">
                        </el-table-column>
                        <el-table-column
                                label="Success ratio"
                                prop="successRatio"
                                width="100px">
                        </el-table-column>
                        <el-table-column
                                label="Status"
                                prop="result">
                            <template slot-scope="scope">
                                <i :class="scope.row.result === 'SUCCESS' ? 'el-icon-success' : 'el-icon-error'"
                                   :style="scope.row.result === 'SUCCESS' ? 'color: green' : 'color: red'"></i>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="Time"
                                prop="timestamp"
                                :formatter="dateFormat">
                        </el-table-column>
                    </el-table>
                </template>
            </el-table-column>
            <el-table-column
                    label="JobType"
                    prop="jobType">
            </el-table-column>
            <el-table-column
                    label="Status"
                    prop="">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import { getJobs } from "../axios/api";
    import echarts from '@/lib/echarts'
    import moment from 'moment'

    export default {
        name: "dashboard",
        data() {
            return {
                tableData: []
            }
        },
        methods: {
            dateFormat: function (row, column) {
                let date = row[column.property];
                if (date === undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD HH:mm:ss");
            },
            drawChart() {
                let jobTypesList = [];
                let jobsData = [];
                getJobs().then((res) => {
                    if (res.status === 200) {
                        this.tableData = res.data;
                        for (let item of this.tableData) {
                            jobTypesList.push(item.jobType);
                            let temp = {
                                value: item.jobList.length,
                                name: item.jobType
                            };
                            jobsData.push(temp)
                        }
                        let myChart = echarts.init(document.getElementById("pie"));
                        let option = {
                            tooltip: {
                                trigger: 'item',
                                formatter: "{a} <br/>{b}: {c} ({d}%)"
                            },
                            legend: {
                                orient: 'vertical',
                                x: 'left',
                                data: jobTypesList
                            },
                            series: [
                                {
                                    name: 'job amount',
                                    type: 'pie',
                                    radius: ['50%', '70%'],
                                    avoidLabelOverlap: false,
                                    label: {
                                        normal: {
                                            show: false,
                                            position: 'center'
                                        },
                                        emphasis: {
                                            show: true,
                                            textStyle: {
                                                fontSize: '20',
                                                fontWeight: 'bold'
                                            }
                                        }
                                    },
                                    labelLine: {
                                        normal: {
                                            show: false
                                        }
                                    },
                                    data: jobsData
                                }
                            ]
                        };
                        myChart.setOption(option);
                    }
                });
            }
        },
        mounted() {
            this.drawChart();
        }
    }
</script>

<style scoped>
    i {
        font-size: 15px
    }
</style>
