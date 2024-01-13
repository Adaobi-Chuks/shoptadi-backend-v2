import Order from "../models/order.models";
import User from "../models/user.models";

export default function userOrderAssociation(): void {
    User.hasMany(Order, {
        foreignKey: {
            name: "userId",
            allowNull: false,
        },
        onDelete: "CASCADE"
    });

    Order.belongsTo(User, {
        foreignKey: {
            name: "userId",
        },
        onDelete: "CASCADE"
    });
}