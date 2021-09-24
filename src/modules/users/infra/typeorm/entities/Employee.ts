import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import Company from './Company';

@Entity('employees')
export default class Employee {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'varchar' })
	fullName: string;

	@Column({ type: 'varchar' })
	phoneNumber: string;

	@ManyToOne(() => Company)
	@JoinColumn()
	company: Company;

	@Column({ type: 'varchar' })
	registration: string;
}
