import { Request, Response, NextFunction } from 'express';
import { Socket } from 'socket.io';
import User from '../User';

export interface CustomRequest extends Request {
  user?: User;
  io?: Socket;
}
