class ApiFeatures{
    constructor(query,querystr){
        this.query = query
        this.querystr = querystr
    }

    search(){
        const keyword = this.querystr.keyword ?{
            name:{
                $regex: this.querystr.keyword,
                $options: "i"
            },
        }:{}
    
        this.query = this.query.find({...keyword})

        return this

    }

    filter(){
        const querycopy = {...this.querystr}
      
        
        const removeFields = ["keyword","page","limit"]
        removeFields.forEach((key)=>delete querycopy[key])
       
        

        //filtering for price
        let queryStr = JSON.stringify(querycopy)
        queryStr = queryStr.replace(/\b(gt,,gte,lt,lte)\b/g,(key)=> `$${key}`)
        this.query = this.query.find(JSON.parse(queryStr))


        return this
    }

    pagination(resultPerPage){
        const currentPage = Number(this.query.page) || 1
        const skip = resultPerPage * (currentPage-1)


        this.query = this.query.limit(resultPerPage).skip(skip)

        return this
    }


}



export default ApiFeatures