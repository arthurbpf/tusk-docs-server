import {
	Column,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import Company from './Company';
import Employee from './Employee';

@Entity('users')
export default class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'varchar', unique: true })
	username: string;

	@Column({ type: 'varchar' })
	password: string;

	@Column({ type: 'varchar' })
	nickname: string;

	@Column({ type: 'varchar' })
	email: string;

	@Column({ type: 'varchar', nullable: true })
	profilePicture?: string;

	@OneToOne(() => Company)
	@JoinColumn()
	company: Company;

	@OneToOne(() => Employee)
	@JoinColumn()
	employee: Employee;
}
