const Message = require('../model/message_model');

exports.getMessages = async (req, res) => {
    const organizationId = req.header("id"); 
    const user = req.user;

    try {
        const messages = await Message.find({organizationId: organizationId}).populate('senderId', 'name email') 
        .sort({ createdAt: 1 });
        res.json(messages);
    }catch(err){
        console.log(err);
        res.status(500).send({message: "Error in getting messages"});
    }
}
exports.saveMessage = async (data) => {

    try {
      const newMessage = new Message({
        organizationId: data.organizationId,
        senderId: data.senderId,
        text: data.text,
      });
      return await newMessage.save();
    } catch (error) {
      console.error('Error saving message:', error);
      throw error;
    }
  };