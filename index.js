/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

 function createEmployeeRecord (array) {
     return {firstName: array[0], familyName: array[1], title: array[2], payPerHour: array[3], timeInEvents: [], timeOutEvents: []}
 }
 
 function createEmployeeRecords (array) {
    return array.map(employee => createEmployeeRecord(employee))
 }

 function createTimeInEvent (dateStamp) {

    const timeInEventObj = {
        type: 'TimeIn', 
        hour: parseInt(dateStamp.substr(11, 4)) , 
        date: dateStamp.substr(0,10)
    }
    const timeInArray = this.timeInEvents
    timeInArray.push(timeInEventObj)
    return this
}

function createTimeOutEvent (dateStamp) {
    const timeOutEventObj = {
        type: 'TimeOut', 
        hour: parseInt(dateStamp.substr(11, 4)) , 
        date: dateStamp.substr(0,10)
    }
    const timeOutArray = this.timeOutEvents
    timeOutArray.push(timeOutEventObj)
    return this
}

function hoursWorkedOnDate (dateStamp) {
    const timeInArr = this.timeInEvents
    const timeInObj = timeInArr.find(event => event.date === dateStamp.substr(0,10))
    const timeOutArr = this.timeOutEvents
    const timeOutObj = timeOutArr.find(event => event.date === dateStamp.substr(0,10))
    return (timeOutObj.hour - timeInObj.hour)/100 
}

function wagesEarnedOnDate (dateStamp) {
    const employeeWages = hoursWorkedOnDate.bind(this)
    return employeeWages(dateStamp) * this.payPerHour
}

function findEmployeeByFirstName (srcArray, firstName) {
    const match = srcArray.find(employee => employee.firstName === firstName)
    return match;
}


const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function calculatePayroll (arrayOfEmployees) {
    const allWages = arrayOfEmployees.map(employee => allWagesFor.call(employee))
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return allWages.reduce(reducer)
}