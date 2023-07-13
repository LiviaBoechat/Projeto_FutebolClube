import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
  } from 'sequelize';
  import db from '.';
  // import OtherModel from './OtherModel';
  
  class SequelizeMatch extends Model<InferAttributes<SequelizeMatch>,
  InferCreationAttributes<SequelizeMatch>> {
    declare id: CreationOptional<number>;
    declare homeTeamID: number;
    declare homeTeamGoals: number;
    declare awayTeamID: number;
    declare awayTeamGoals: number;
    declare inProgress: boolean;
  }
  
  SequelizeMatch.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    homeTeamID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    homeTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    awayTeamID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    awayTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    inProgress: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  }, {
    sequelize: db,
    modelName: 'matches',
    timestamps: false,
  });
  
  /**
    * `Workaround` para aplicar as associations em TS:
    * Associations 1:N devem ficar em uma das instâncias de modelo
    * */
  
  // OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
  // OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });
  
  // Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
  // Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });
  
  export default SequelizeMatch;
  