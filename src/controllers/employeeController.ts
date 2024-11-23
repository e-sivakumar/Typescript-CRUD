import { Request, Response } from "express";
import Employee, { IEmployee } from "../models/Employee";

export async function getEmployees (req: Request, res: Response) {
  try {
    const employees = await Employee.find({},{
      name: 1, position: 1, salary: 1, city: 1 
    });
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch employees" });
  }
};

export async function getEmployeeById (req: Request, res: Response) {
  try {
    const id  = req.params.id;
    const employee = await Employee.findById(id,{
      name: 1, position: 1, salary: 1, city: 1 
    });
    if (!employee) return res.status(404).json({ error: "Employee not found" });
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch employee" });
  }
};

export async function createEmployee (req: Request, res: Response) {
  try {
    const { name, position, salary, city } = req.body;
    const newEmployee: IEmployee = new Employee({ name, position, salary, city });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(500).json({ error: "Failed to create employee" });
  }
};

export async function updateEmployee (req: Request, res: Response) {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (!updatedEmployee) return res.status(404).json({ error: "Employee not found" });
    res.status(200).json(updatedEmployee);
  } catch (err) {
    res.status(500).json({ error: "Failed to update employee" });
  }
};

export async function deleteEmployee (req: Request, res: Response) {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) return res.status(404).json({ error: "Employee not found" });
    res.status(200).json({ message: "Employee deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete employee" });
  }
};
