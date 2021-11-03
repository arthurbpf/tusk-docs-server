import Client from '@modules/clients/infra/typeorm/entities/Client';
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('documents')
export default class Document {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'varchar' })
	title: string;

	@Column({ type: 'varchar' })
	description: string;

	@Column({ type: 'varchar' })
	fileUrl: string;

	@Column({ type: 'varchar' })
	originalFileName: string;

	@ManyToOne(() => Client)
	@JoinColumn()
	owner: Client;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
