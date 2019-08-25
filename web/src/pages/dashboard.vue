<template>
    <div>
        <div class="block">
            <div class="title">
                <el-divider content-position="left">Api Status</el-divider>
            </div>
            <div class="source">
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
                            prop="status">
                        <template slot-scope="scope">
                            <i :class="scope.row.status === 'SUCCESS' ? 'el-icon-success' : 'el-icon-error'"
                               :style="scope.row.status === 'SUCCESS' ? 'color: green' : 'color: red'"></i>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="block">
            <div class="title">
                <el-divider content-position="left">Incidents History</el-divider>
            </div>
            <div class="source">
                <el-calendar v-model="date" v-if="update">
                    <template v-slot:dateCell="{date, data}">
                        <el-popover
                                :ref="data.day"
                                placement="right"
                                width="400"
                                :value="clickDate=== data.day"
                                trigger="manual">
                            <i class="el-icon-close" @click="dismiss" style="float: right;cursor: pointer"></i>
                            <el-table :data="form.errorJobList">
                                <el-table-column property="url" label="Error job url"></el-table-column>
                            </el-table>
                            <el-divider content-position="left">
                                <div class="comment-header">Comment</div>
                            </el-divider>
                            <div class="comment-body">
                                <el-form ref="form" :model="form">
                                    <el-form-item>
                                        <el-input
                                                type="textarea"
                                                placeholder="请输入内容"
                                                v-model="form.comment"
                                                maxlength="100"
                                                show-word-limit
                                        >
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary" style="float: right;" @click="submit">Add</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <div slot="reference"
                                 :ref="data.day + 'div'"
                                 @click="clickCalendar(data)"
                                 style="height: 100%;width: 100%">
                                {{data.day.split('-').slice(1).join('-') }}
                            </div>
                        </el-popover>
                    </template>
                </el-calendar>
            </div>
        </div>
    </div>
</template>

<script>
    import { addComment, editComment, getHistory, getJobs } from "../axios/api";
    import echarts from '@/lib/echarts'
    import moment from 'moment'

    export default {
        name: "dashboard",
        data() {
            return {
                tableData: [],
                history: [],
                oldDate: '',
                visible: false,
                errorJobList: [],
                form: {},
                clickDate: '',
                date: new Date(),
                update: true
            }
        },
        methods: {
            clickCalendar: function (data) {
                this.clickDate = data.day;
                this.form = {};
                for (let item of this.history) {
                    if (data.day === moment(new Date(item.date)).format("YYYY-MM-DD")) {
                        this.form = item;
                    }
                }
            },
            dismiss: function () {
                this.clickDate = '';
            },
            dateFormat: function (row, column) {
                let date = row[column.property];
                if (date === undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD HH:mm:ss");
            },
            getIncidentsHistory() {
                getHistory().then((res) => {
                    if (res.status === 200) {
                        this.history = res.data;
                        for (let item of this.history) {
                            let refIndex = moment(new Date(item.date)).format("YYYY-MM-DD") + 'div';
                            if (this.$refs[refIndex]) {
                                this.$refs[refIndex].innerText = moment(new Date(item.date)).format("MM-DD");
                                if (new Date(item.date).getTime() < new Date().getTime()) {
                                    if (item.errorJobList.length === 0) {
                                        this.$refs[refIndex].parentElement.parentElement.style.backgroundColor = '#cbf6b6';
                                    } else {
                                        this.$refs[refIndex].parentElement.parentElement.style.backgroundColor = '#ffd7d7';
                                    }
                                }
                            }
                        }
                    }
                })
            },
            getApiStatusAndDrawChart() {
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
            },
            submit() {
                let model = {
                    comment: this.form.comment,
                };
                if (this.form.date) {
                    model.date = moment(new Date(this.form.date)).format("YYYY-MM-DD")
                } else {
                    model.date = this.clickDate;
                }
                if (this.form.errorJobList && this.form.errorJobList.length > 0) {
                    model.errorJobList = this.form.errorJobList;
                }
                if (this.form._id) {
                    editComment(this.form._id, model).then((res) => {
                        if (res.status === 200) {
                            this.clickDate = '';
                            this.getIncidentsHistory();
                            this.$message({
                                showClose: true,
                                message: 'Edit comment!',
                                type: 'success'
                            });
                        }

                    })
                } else {
                    addComment(model).then((res) => {
                        if (res.status === 200) {
                            this.clickDate = '';
                            this.getIncidentsHistory();
                            this.$message({
                                showClose: true,
                                message: 'Add comment',
                                type: 'success'
                            });
                        }
                    })
                }

            }
        },
        mounted() {
            this.getApiStatusAndDrawChart();
            this.getIncidentsHistory();
        },
        watch: {
            date: function () {
                this.update = false;
                this.$nextTick(() => {
                    this.update = true;
                    this.getIncidentsHistory()
                })
            }
        }
    }
</script>
<style scoped>

    .block {
        margin-bottom: 24px;
        border: 1px solid #ebebeb;
        border-radius: 3px;
        box-shadow: rgba(0, 0, 0, 0.12) 0 2px 4px, rgba(0, 0, 0, 0.04) 0 0 6px
    }

    .title {
        padding: 10px;
    }

    .source {
        padding: 24px;
    }

    i {
        font-size: 15px
    }

    .comment-header {
        font-weight: bold;
        font-size: 12px;
        color: #909399;
    }

    .comment-body {
        padding-left: 10px;
        font-size: 12px;
        color: #909399;
    }
</style>
