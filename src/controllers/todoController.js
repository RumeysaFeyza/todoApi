const todo = require("../models/todoModel")

const todoAdd = async (req, res) => {
    
    try {
        const _todo = await todo.findOne({name: req.body.name})

        if (_todo) {
            return res.status(400).json({
                success: false,
                message:"Bu isimde kayıt mevcut"
            })
        }


        const todoAdd = new todo(req.body)

        await todoAdd.save()
          .then(() => {
            return res.status(201).json(todoAdd)
          })
          .catch((err) => {
            return res.status(400).json({
                success: false,
                message: "Kayıt Oluşturulurken Hata Çıktı: " + err
            })

          })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message:"Kayıt oluşturulamadı !"
    
        })
    }
    
}


const todoGetAll = async(req, res) => {
try {
    const todoGetAll = await todo.find({})
    return res.status(200).json({
        success: true,
        data: todoGetAll
    })
} catch (error) {
    return res.status(500).json({
        success:false,
        message: "Kayıt Getirilemedi !"
    })
}
}

const todoUpdate = async (req, res) => {
    const { id } = req.params

    try {
        const todoUpdate = await todo.findByIdAndUpdate(id, req.body)
        if (todoUpdate) {
            return res.status(200). json({
                success: true,
                message:"güncelleme başarılı"
            })
        }
        else return res.status(400).json({
            succcess: false,
            message: "Kayıt Güncellenemedi !"

        })
    } catch (error) {
        
        return res.status(500).json({
            success: false,
            message:"Kayıt Güncellenemedi !"
        })
    }

}
const todoDelete = async (req, res) => {

    const { id } = req.params
    try {
        const todoDelete = await todo.findByIdAndDelete(id)
        if (todoDelete) {
            return res.status(200).json({
                success: true,
                message: "Kayıt Başarıyla Silindi"
            })
        }
    else {
        return res.statuts(400).json({
            success: false,
            message: "Kayıt Silinemedi"
        })
    }
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "Kayıt Silinemedi: " + error
        })
        
    }
}


module.exports = {
    todoAdd,
    todoGetAll,
    todoUpdate,
    todoDelete
}