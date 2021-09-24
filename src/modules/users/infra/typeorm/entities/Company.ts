import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './User';

@Entity('companies')
export default class Company {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'varchar' })
	legalName: string;

	@Column({ type: 'varchar' })
	businessName: string;

	@Column({ type: 'varchar' })
	registration: string;

	@OneToOne(() => User)
	user: User;
}
