import { Webhook } from "svix";
import { User } from "../models/user.model.js";

export const clerkWebhooks = async (req, res) => {
    try {

        // creating an instance of webhook with clerk webhook
        const clerk_Webhook_Id = process.env.CLERK_WEBHOOK_KEY
        const whook_instance_with_clerk = new Webhook(clerk_Webhook_Id)

        // verify the instance of webhook
        await whook_instance_with_clerk.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        })

        const { data, type } = req.body

        switch (type) {
            case 'user.created': {
                const user = new User({
                    _id: data.id,
                    name: data.first_name + ' ' + data.last_name,
                    email: data.email_addresses[0].email_address,
                    image: data.image_url,
                    resume: ''
                })
                await User.create(user)
                res.json({ message: 'User Created Successfully' })
                break;
            }

            case 'user.updated': {
                const user = new User({
                    name: data.first_name + ' ' + data.last_name,
                    email: data.email_addresses[0].email_address,
                    image: data.image_url,
                })
                await User.findOneAndUpdate({ _id: data.id }, user)
                res.json({ message: 'User Updated Successfully' })
                break;
            }

            case 'user.deleted': {
                await User.findOneAndDelete({ _id: data.id })
                res.json({ message: 'User Deleted Successfully' })
                break;
            }
            default:
                break;
        }

    } catch (error) {
        console.log(error);
        res.json({ message: 'Something went wrong in webhook' , success: false})
    }
}