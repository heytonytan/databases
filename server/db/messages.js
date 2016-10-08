module.exports = function(sequelize, DataTypes) {
  return sequelize.define('messages', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    userid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    roomname: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'messages',
    timestamps: false
  });
};
